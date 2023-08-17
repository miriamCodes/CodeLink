'use client';

import React, { useState } from 'react';
import NavBar from './components/nav-bar';
import '@/app/styles/home.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <main>
      <div className={roboto.className}>
        <div className="home_div">
          <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <div className="homepage_div">
            <div className="welcome_div">
              <h2 className="welcome">Welcome to CodeLink!</h2>
              <h3 className="welcome">
                A new platform for developers to meet and share their skills.
              </h3>
            </div>
            <div className="news_div"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
