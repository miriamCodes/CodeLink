'use client';

import React, { useState } from 'react';
import NavBar from '../app/components/nav-bar';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <main>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div><p></p></div>
    </main>
  );
}
