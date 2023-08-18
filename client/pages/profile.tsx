'use client';

import React, { useState, useEffect } from 'react';
import UserProfile from '../app/components/user-profile';
import SkillForm from '@/app/components/skill-form';
import ProfileForm from '@/app/components/profile-form';
import NavBar from '@/app/components/nav-bar';
import { Roboto } from 'next/font/google';
import '@/app/styles/profile.css';
import Button from '@/app/components/button';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export default function Profile() {
  const [addSkill, setAddSkill] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [value, setValue] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (event.target.id === 'skill') setAddSkill(true);
    if (event.target.id === 'edit') setEditProfile(true);
  }
  return (
    <main>
      <div className={roboto.className}>
        <div className="profile_div">
          <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <div className="profile_buttons">
            <UserProfile value={value} />
            <div className="button_div">
              <button
                className="button"
                id="skill"
                onClick={(event) => handleClick(event)}
              >
                Add skill
              </button>
              <button
                className="button"
                id="edit"
                onClick={(event) => handleClick(event)}
              >
                Edit profile
              </button>
            </div>
            {addSkill && (
              <div className="skill_div">
                <SkillForm
                  setValue={setValue}
                  value={value}
                  addSkill={addSkill}
                  setAddSkill={setAddSkill}
                />
              </div>
            )}
            {editProfile && (
              <div className="edit_div">
                <ProfileForm
                  setValue={setValue}
                  value={value}
                  editProfile={editProfile}
                  setEditProfile={setEditProfile}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
