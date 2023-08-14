import React from 'react';
import Navbar from './components/navbar';
import styles from './styles/navbar.module.css';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <>
      {/* <Head/> */}
      <Navbar
        loggedIn={false}
        setLoggedIn={function (loggedIn: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />
      <main className={styles.mainContent}>{children}</main>
    </>
  );
}
