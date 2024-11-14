import numpy as np
import pandas as pd
import pickle
import nltk
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

movies = pd.read_csv('../../data/movies.csv')
ratings = pd.read_csv('../../data/ratings.csv')

movies = movies.drop_duplicates()

#for converting str to list
def convert(text):
    L = text.split('|')
    return L

movies['genres'] = movies['genres'].apply(convert)

movies['overview'] = movies['overview'].apply(lambda x:x.split())

def remove_space(L):
    L1 = []
    for i in L:
        L1.append(i.replace(" ",""))
    return L1

movies['genres'] = movies['genres'].apply(remove_space)



movies = movies[['movieId','title','genres','overview','runtime']]

movies['tags'] = movies['overview'] + movies['genres']

movies.iloc[0]['tags']

new_df = movies[['movieId','title','tags']]

# Converting list to str
new_df['tags'] = new_df['tags'].apply(lambda x: " ".join(x))

# Converting to lower case
new_df['tags'] = new_df['tags'].apply(lambda x:x.lower())

ps = PorterStemmer()

def stems(text):
    T = []

    for i in text.split():
        T.append(ps.stem(i))

    return " ".join(T)

new_df['tags'] = new_df['tags'].apply(stems)

cv = CountVectorizer(max_features=5000,stop_words='english')

vector = cv.fit_transform(new_df['tags']).toarray()

similarity = cosine_similarity(vector)

def recommend(movie):
    index = new_df[new_df['title'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1])
    for i in distances[1:6]:
        print(new_df.iloc[i[0]].title)

# recommend('Spider-Man 2')

pickle.dump(new_df,open('artifacts/movie_list.pkl','wb'))
pickle.dump(similarity,open('artifacts/similarity.pkl','wb'))