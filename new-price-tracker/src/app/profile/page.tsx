"use client";
import { useQuery } from "@blitzjs/rpc";
import getUserProfile from "./queries/getUserProfile";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css"

const MEME_API_KEY = "vzH4535Rx7QR2yRjm7d0oE7fLG0fmL4y";

async function fetchRandomMeme(tag: string): Promise<string> {
  try {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/random?api_key=${MEME_API_KEY}&tag=${tag}`
    );
    return response.data.data.images.original.url;
  } catch (error) {
    console.error("Error fetching meme:", error);
    throw error;
  }
}

export default function UserProfile() {
  const [user, { isLoading, error }] = useQuery(getUserProfile, {});

  const [memeUrl, setMemeUrl] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState("groceries");

  useEffect(() => {
    async function fetchMeme() {
      try {
        const url = await fetchRandomMeme(selectedTag);
        setMemeUrl(url);
      } catch (error) {
        console.error("Failed to fetch meme:", error);
      }
    }

    fetchMeme();
  }, [selectedTag]);

  if (error) {
    console.error("Error fetching user profile:", error);
    return (
      <div>
        <h1>Error</h1>
        <p>Something went wrong while fetching your profile.</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>; 
  }

  if (!user) {
    return <p>User not found</p>; 
  }

  return (
    <div>
      <div className={styles.globe} />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>User Profile</h1>
        </div>
      
        <div className={styles.centerBox}>
          <div className="info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          <div className="tag-selector">
            <label htmlFor="tag-select">Choose a theme:</label>
            <select
              id="tag-select"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="groceries">Groceries</option>
              <option value="shopping">Shopping</option>
              <option value="pricing">Pricing</option>
              <option value="food">Food</option>
              <option value="supermarket">Supermarket</option>
              <option value="money">Money</option>
              <option value="discount">Discount</option>
              <option value="cart">Cart</option>
            </select>
          </div>

          {memeUrl && (
            <div className="meme-container">
              <img src={memeUrl} alt={`${selectedTag} Meme`} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}