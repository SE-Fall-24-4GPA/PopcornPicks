import unittest
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from prediction_scripts.vector_embed import convert, remove_space, stems, recommend, new_df, similarity

class TestRecommendationSystem(unittest.TestCase):
    
    def test_convert(self):
        # Test genre string conversion to list
        self.assertEqual(convert("Action|Comedy|Drama"), ["Action", "Comedy", "Drama"])
    
    def test_remove_space(self):
        # Test removal of spaces in genres list
        self.assertEqual(remove_space(["Action ", " Comedy", "Drama "]), ["Action", "Comedy", "Drama"])

    def test_stems(self):
        # Test stemming on a sample overview text
        self.assertEqual(stems("running jumped"), "run jump")
    
    def test_vectorizer_output_shape(self):
        # Test that the vectorized output has the expected shape
        cv = CountVectorizer(max_features=5000, stop_words='english')
        vector = cv.fit_transform(new_df['tags']).toarray()
        self.assertEqual(vector.shape[1], 5000)

    def test_cosine_similarity_shape(self):
        # Test that the cosine similarity matrix has the correct shape
        vector = CountVectorizer(max_features=5000, stop_words='english').fit_transform(new_df['tags']).toarray()
        similarity_matrix = cosine_similarity(vector)
        self.assertEqual(similarity_matrix.shape, (len(new_df), len(new_df)))
    
    def test_recommend(self):
        # Test recommend function output format
        movie_title = new_df.iloc[0]['title']  # Get a valid movie title
        recommendations = recommend(movie_title)
        self.assertIsInstance(recommendations, list)
        self.assertEqual(len(recommendations), 5)  # Expect 5 recommendations

    def test_recommend_movie_exists(self):
        # Test that recommending a movie not in the list raises an IndexError
        with self.assertRaises(IndexError):
            recommend("Nonexistent Movie Title")

if __name__ == "__main__":
    unittest.main()