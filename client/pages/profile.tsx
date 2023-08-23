'use client';

import React, { useState } from 'react';
import UserProfile from '../app/components/user-profile';
import SkillForm from '@/app/components/skill-form';
import ProfileForm from '@/app/components/profile-form';
import NavBar from '@/app/components/nav-bar';
import { Roboto } from 'next/font/google';
import '@/app/styles/profile.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export default function Profile() {
  const [addSkill, setAddSkill] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [value, setValue] = useState(false);
  const [value1, setValue1] = useState(false);

  function handleDiv(event) {
    if (
      event.target.divId !== 'skill-form' &&
      event.target.id === 'skill-overlay'
    ) setAddSkill(false);
    else if (
      event.target.divId !== 'profile-form' &&
      event.target.id === 'profile-overlay'
    ) setEditProfile(false);
  }

  return (
    <main>
      <div className={roboto.className}>
        <div className="profile_div">
          <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <div className="profile_buttons">
            {addSkill && (
              <div
                onClick={(event) => handleDiv(event)}
                id="skill-overlay"
                className="overlay_div"
              >
                <SkillForm
                  divId="skill-form"
                  setValue={setValue}
                  value={value}
                  addSkill={addSkill}
                  setAddSkill={setAddSkill}
                />
              </div>
            )}
            {editProfile && (
              <div
                onClick={(event) => handleDiv(event)}
                id="profile-overlay"
                className="overlay_div"
              >
                <ProfileForm
                  divId="profile-form"
                  setValue1={setValue1}
                  value1={value1}
                  editProfile={editProfile}
                  setEditProfile={setEditProfile}
                />
              </div>
            )}
            <div className="container_div">
              <UserProfile
                addSkill={addSkill}
                setAddSkill={setAddSkill}
                editProfile={editProfile}
                setEditProfile={setEditProfile}
                setValue1={setValue1}
                value1={value1}
                setValue={setValue}
                value={value}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
