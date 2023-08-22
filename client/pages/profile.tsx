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

  return (
    <main>
      <div className={roboto.className}>
        <div className="profile_div">
          <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <div className="profile_buttons">
            <UserProfile addSkill={addSkill} setAddSkill={setAddSkill} editProfile={editProfile} setEditProfile={setEditProfile} value1={value1} value={value} />
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
                  setValue1={setValue1}
                  value1={value1}
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
