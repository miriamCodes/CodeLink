import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/user-profile.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface Properties {
  value: boolean;
  value1: boolean;
}

export default function UserProfile({value, value1} : Properties) {
  const [profile, setProfile] = useState({
    bio: '',
    user: { firstName: '', lastName: '', email: '', gitHub: '' },
    skill: [
      {
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
        <p>{profile.user.email}</p>
      </div>
      <div className={styles.profile_field}>
        <p>
          <b>GitHub Username</b>
        </p>
        <p>
          <Link href={`http://github.com/${profile.user.gitHub}`}>
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
          <div>
            {profile.skill.map((s) => (
              <div key="skill">
                <p key={s.programmingSkill}>{capitalize(s.programmingSkill)}</p>
                <p key={s.experience}>
                  <i>{capitalize(s.experience)}</i>
                </p>
                <p key={s.level}>
                  <i>{capitalize(s.level)}</i>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>No skills to display yet - click on add skills below.</div>
        )}
      </div>
    </div>
  );
}
