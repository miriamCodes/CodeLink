'use client';

import React, { useState } from 'react';
import UserProfile from '../app/components/user-profile';
import SkillForm from '@/app/components/skill-form';
import ProfileForm from '@/app/components/profile-form';

export default function Profile() {
  const [addSkill, setAddSkill] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  function handleClick(event: React.MouseEvent<HTMLElement>){
    console.log(event.target.id);
    
    if(event.target.id === "skill") setAddSkill(true);
    if(event.target.id === "edit") setEditProfile(true);
  }
  return (
    <main>
      <UserProfile
      />
      <div>
        <button id="skill" onClick={(event) => handleClick(event)}>Add skill</button>
        <button id="edit" onClick={(event) => handleClick(event)}>Edit profile</button>
      </div>
      <div>
        {addSkill && (
          <SkillForm addSkill={addSkill} setAddSkill={setAddSkill} />
        )}
        {editProfile && (
          <ProfileForm
          />
        )}
      </div>
    </main>
  );
}
