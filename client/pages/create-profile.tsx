'use client';

import React, { useState } from 'react';
import ProfileForm from '@/app/components/profile-form';
import SkillForm from '@/app/components/skill-form';

export default function CreateProfile() {
  const [addSkill, setAddSkill] = useState(false);
  function handleClick() {
    setAddSkill(true);
  }
  return (
    <main>
      <ProfileForm />
      <button type="submit" onClick={handleClick}>
        Save
      </button>
      {addSkill && <SkillForm addSkill={addSkill} setAddSkill={setAddSkill} />}
    </main>
  );
}
