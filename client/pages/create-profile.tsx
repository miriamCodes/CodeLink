'use client';

import React, { useState } from 'react';
import ProfileForm from '@/app/components/profile-form';
import NavBar from '@/app/components/nav-bar';
import { Roboto } from 'next/font/google';
import '@/app/styles/create-profile.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export default function CreateProfile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  return (
    <main className="dashboard">
      <div className={roboto.className}>
        <div className="profile_div">
          <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <ProfileForm
            editProfile={editProfile}
            setEditProfile={setEditProfile}
          />
        </div>
      </div>
    </main>
  );
}
