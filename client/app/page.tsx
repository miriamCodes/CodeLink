'use client';
import React from 'react';
import Layout from './layout';
import styles from './styles/home.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function Home(): React.JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className={styles.home}>
      <Layout>
        <div>
          <h1>Welcome to CodeLink</h1>
        </div>
        <div>About us</div>
        <div>
          <Link href="/feature">Check out this feature</Link>
        </div>
      </Layout>
    </div>
  );
}
