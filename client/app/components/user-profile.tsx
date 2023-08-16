import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/user-profile.module.css';
import Image from 'next/image';

export default function UserProfile() {
  const [profile, setProfile] = useState({bio: '',
    user: {firstName: '', lastName: '', email: ''}
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
  }, []);
  return (
    <div className={styles.profile_div}>
      <div className={styles.profile_image}>
        <Image
          className={styles.default_image}
          alt="CodeLink logo"
          width="100"
          height="100"
          src="/logo-exemplar.png"
        />
      </div>
      <div className={styles.profile_field}>
        <div className={styles.profile_title}>
          <h2>{profile.user.firstName}</h2>
          <h2>{profile.user.lastName}</h2>
        </div>
      </div>
      <div className={styles.profile_field}>
        <p>Email</p>
        <p>{profile.user.email}</p>
      </div>
      <div className={styles.profile_field}>
        <p>Bio</p>
        <p>{profile.bio}</p>
      </div>
    </div>
  );
}
