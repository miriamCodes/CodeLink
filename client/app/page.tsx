'use client';
import React from 'react';
import Layout from './layout';
import styles from './styles/home.module.css';
import Link from 'next/link';

export default function Home(): React.JSX.Element {
  return (
    <div className={styles.home}>
      {/* <Layout> */}
        <div>
          <h1>Welcome to CodeLink</h1>
        </div>
        <div>from Adam, Miriam, Pablo & Philippa (in alphabetical order)</div>
        <div>
          <Link href="/feature">Check out this feature, but not yet.</Link>
        </div>
      {/* </Layout> */}
    </div>
  );
}
