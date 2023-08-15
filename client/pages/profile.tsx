'use client';

import React, { useState } from 'react';
import UserProfile from '../app/components/user-profile';
import SkillForm from '@/app/components/skill-form';
import ProfileForm from '@/app/components/profile-form';

export default function Profile() {
  const [addSkill, setAddSkill] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  return (
    <main>
      <UserProfile
      />
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
