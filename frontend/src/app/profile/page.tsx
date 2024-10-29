// app/profile/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userMovies, setUserMovies] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [recentFriendMovies, setRecentFriendMovies] = useState<Record<string, any[]>>({});

  useEffect(() => {
    // Fetch user name
    axios.get("/getUserName").then((response) => {
      setUserName(response.data);
    });

    // Fetch user's recent movies
    axios.get("/getRecentMovies").then((response) => {
      setUserMovies(response.data);
    });

    // Fetch friends list and their recent movies
    axios.get("/getFriends").then((response) => {
      setFriendsList(response.data);
    });
  }, []);

  const showFriendMovies = (friendName: string) => {
    if (recentFriendMovies[friendName]) {
      setRecentFriendMovies((prev) => ({ ...prev, [friendName]: [] }));
    } else {
      axios.post("/getRecentFriendMovies", { friend: friendName }).then((response) => {
        setRecentFriendMovies((prev) => ({ ...prev, [friendName]: response.data }));
      });
    }
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
      {/* User Name Banner */}
      <h1 className="text-4xl font-bold mb-8">
        Welcome {userName}!
      </h1>

      <div className="container max-w-3xl mx-auto space-y-8">
        {/* User's Reviewed Movies */}
        <section className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-black">Your Reviewed Movies</h2>
          <ul className="space-y-2">
            {userMovies.map((movie, index) => (
              <li key={index} className="text-lg">"Movie Name" {
                //movie.name
                }: {
                    //movie.score
                    } 10/10 stars</li>
            ))}
          </ul>
        </section>

        {/* Friends List with Recent Movies */}
        <section className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-black">Your Friends</h2>
          <ul className="space-y-4">
            {friendsList.map((friend, index) => (
              <li key={index} className="relative">
                <Button
                  onClick={() => showFriendMovies(friend)}
                  color="success"
                  className="w-full"
                >
                  {friend}
                </Button>
                {recentFriendMovies[friend] && (
                  <div className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-lg p-4 z-10">
                    {recentFriendMovies[friend].map((movie, idx) => (
                      <p key={idx} className="text-gray-700">
                        {movie.name}: {movie.score}/10 stars
                      </p>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Add Friend and Return Home Buttons */}
        <div className="flex flex-col items-center space-y-4">
          <Input
            placeholder="Enter your friend's username"
            aria-label="FriendId"
            id="addFriend"
            className="w-full max-w-xs"
          />
          <Button
            onClick={() => {
              // Add friend functionality here
              console.log("Add Friend button clicked");
            }}
            color="primary"
          >
            Add Friend
          </Button>
          <Button
            onClick={() => router.push("/")}
            color="primary"
          >
            Return Home
          </Button>
        </div>
      </div>
    </main>
  );
}