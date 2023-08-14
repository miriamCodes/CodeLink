import React from 'react';
import Navbar from './components/navbar';
import styles from './styles/navbar.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <>
    <html>
      <body>
      <Navbar/>
      <main>{children}</main>
      </body>
      </html>
    </>
  );
}
