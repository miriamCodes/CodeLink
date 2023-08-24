import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/user-profile.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Portfolio from './portfolio';

interface Properties {
  value: boolean;
  setValue: (value: boolean) => void;
  value1: boolean;
  setValue1: (value1: boolean) => void;

  addSkill: boolean;
  setAddSkill: (addSkill: boolean) => void;
  editProfile: boolean;
  setEditProfile: (setEditSkill: boolean) => void;
}

export default function UserProfile({value, setValue, value1, setValue1, addSkill, setAddSkill, editProfile, setEditProfile} : Properties) {
  const [profile, setProfile] = useState({
    bio: '',
    user: { firstName: '', lastName: '', email: '', gitHub: '' },
    skill: [
      {
        id: '',
        experience: '',
        level: '',
        programmingSkill: '',
      },
    ],
  });
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
  }, [value, value1]);

  function capitalize (word: string) {
    return word
      .toLowerCase()
      .split(' ')
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  async function handleSkillDelete(skill){
    await fetch('http://localhost:3001/delete-skill', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: skill.id }),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
    setValue(!value);
  }

  return (
    <div className={styles.profile_div}>
      <div className={styles.profile_image}>
        <Image
          className={styles.default_image}
          alt="CodeLink logo"
          width="100"
          height="100"
          src="/blank-avatar.jpg"
        />
      </div>
      <div className={styles.profile_field}>
        <div className={styles.profile_title}>
          <h2>
            {capitalize(`${profile.user.firstName} ${profile.user.lastName}`)}
          </h2>
        </div>
      </div>
      <div className={styles.profile_field}>
        <p>
          <b>Email</b>
        </p>
        <Link id="email-link" className={styles.link} href={`mailto:${profile.user.email}`}>
          <p>{profile.user.email}</p>
        </Link>
      </div>
      <div className={styles.profile_field}>
        <p>
          <b>GitHub Username</b>
        </p>
        <p>
          <Link
            id="github-link"
            className={styles.link}
            href={`http://github.com/${profile.user.gitHub}`}
          >
            {profile.user.gitHub}
          </Link>
        </p>
      </div>
      <div className={styles.profile_field}>
        <p>
          <b>Bio</b>
        </p>
        <p>{profile.bio}</p>
      </div>
      <div className={styles.profile_field}>
        <p>
          <b>Skills</b>
        </p>
        {profile.skill.length > 0 ? (
          <div className={styles.skills_div}>
            {profile.skill.map((s) => (
              <div className={styles.skill_div} key={s.programmingSkill}>
                <p className={styles.language} key={s.programmingSkill}>
                  {capitalize(s.programmingSkill)}
                </p>
                <p className={styles.experience} key={s.experience}>
                  {capitalize(s.experience)}
                </p>
                <p className={styles.level} key={s.level}>
                  {capitalize(s.level)}
                </p>
                <button
                  className={styles.small_button}
                  onClick={() => handleSkillDelete(s)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.skills_div}>
            <p className={styles.no_skills}>No skills to display yet - click on add skills below.</p>
          </div>
        )}
      </div>
      <Portfolio
        setAddSkill={setAddSkill}
        addSkill={addSkill}
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        profile={profile}
        setProfile={setProfile}
      />
    </div>
  );
}
