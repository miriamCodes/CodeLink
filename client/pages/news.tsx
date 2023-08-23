'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '@/app/components/nav-bar';
import '@/app/styles/home.css';
import { Roboto } from 'next/font/google';
import Feed from '@/app/components/feed';
import '@/app/styles/news.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export default function News() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <main>
      <div className={roboto.className}>
        <div className="home_div">
          <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <div className="news_div">
              <Feed />
            </div>
        </div>
      </div>
    </main>
  );
}
