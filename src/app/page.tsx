"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { API_ENDPOINTS } from "./API/ApiStore";

// Loader component
const Loader: React.FC = () => (
  <div className={styles.loader}>
    <div className={styles.spinner}></div>
  </div>
);

export default function Landing() {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form submitted with username:", username);

    try {
      const response = await fetch(API_ENDPOINTS.addUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      console.log("Received response:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("User added:", data);

        // Set username in sessionStorage
        sessionStorage.setItem('username', username);

        console.log("Redirecting to /Home...");
        window.location.href = '/Home';
      } else {
        console.error("Failed to store user details");
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to DaVis</h1>
        <p className={styles.description}>Discover the Power of Data</p>

        <section className={styles.intro}>
          <p>DaVis is a data exploration tool designed to revolutionize the way you interact with your data.</p>
        </section>
        <section className={styles.cta}>
          <h2>Start Exploring Your Data</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
}
