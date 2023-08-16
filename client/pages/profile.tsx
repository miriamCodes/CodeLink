'use client';

import React, { useState, useEffect } from 'react';
import UserProfile from '../app/components/user-profile';
import SkillForm from '@/app/components/skill-form';
import ProfileForm from '@/app/components/profile-form';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [addSkill, setAddSkill] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const id = 1; // Change this when auth is up and running

  useEffect(() => {
    fetch(`http://localhost:3001/profile/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((error) => console.log(error));
  }, []);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (event.target.id === 'skill') setAddSkill(true);
    if (event.target.id === 'edit') setEditProfile(true);
  }
  return (
      <main>
        <UserProfile />
        <div>
          <button id="skill" onClick={(event) => handleClick(event)}>
            Add skill
          </button>
          <button id="edit" onClick={(event) => handleClick(event)}>
            Edit profile
          </button>
        </div>
        <div>
          {addSkill && (
            <SkillForm addSkill={addSkill} setAddSkill={setAddSkill} />
          )}
          {editProfile && <ProfileForm />}
        </div>
      </main>
  );
}
