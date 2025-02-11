"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Home.module.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>DaVis-Explore</div>
        <div className={styles.userInfo}>
          <span>{username}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </div>
      </header>
      <main className={styles.main}>
        <h1 className={styles.welcomeTitle}>Hi {username}! Please try one of our features</h1>
        <div className={styles.featureContainer}>
          <Link href="/sheetinsights" className={styles.featureButton}>
            Sheet Insight Hub
          </Link>
          <Link href="/dbinsights" className={styles.featureButton}>
            DB Insight Hub
          </Link>
        </div>
      </main>
    </div>
  );
}
