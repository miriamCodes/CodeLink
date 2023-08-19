'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/app/styles/profile-form.module.css';
import Button from './button';
import { useRouter } from 'next/navigation';
interface Properties {
  editProfile: boolean;
  setEditProfile: (editProfile: boolean) => void;
  value1: boolean;
  setValue1: (value: boolean) => void;
}

export default function ProfileForm({
  editProfile,
  setEditProfile,
  value1,
  setValue1,
}: Properties) {
  const [profile, setProfile] = useState({
    bio: '',
    user: { firstName: '', lastName: '', email: '' },
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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (editProfile) {
      const fetchData = async () => {
        await fetch(`http://localhost:3001/profile/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => setProfile(data))
          .catch((error) => console.log(error));
      };
      fetchData();
      setFirstName(profile.user.firstName);
      setLastName(profile.user.lastName);
      setBio(profile.bio);
    }
  }, [editProfile, profile.bio, profile.user.firstName, profile.user.lastName]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (editProfile) {
      event.preventDefault();
      await fetch(`http://localhost:3001/update-profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, bio }),
      })
        .then((res) => res.json())
        .catch((error) => console.log(error));
      setValue1(!value1);
      setEditProfile(false);
    } else {
      event.preventDefault();
      await fetch('http://localhost:3001/create-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, bio }),
      })
        .then((res) => res.json())
        .catch((error) => console.log(error));
      setFirstName('');
      setLastName('');
      setEmail('');
      setBio('');
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.id) {
      case 'first-name':
        setFirstName(event.target.value);
        break;
      case 'last-name':
        setLastName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'bio':
        setBio(event.target.value);
        break;
    }
  }
  const router = useRouter();
  function handleClick() {
    router.replace('/profile');
  }
  return (
    <div className={styles.profile_div}>
      <div className={styles.profile_form}>
        <div className={styles.profile_submit}>
          {!editProfile ? (
            <h2 className={styles.form_title}>Create a profile:</h2>
          ) : (
            <h2 className={styles.form_title}>Update profile:</h2>
          )}
          <form
            className={styles.form_inputs}
            id="profile-form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className={styles.label_input}>
              <label className={styles.form_label} htmlFor="first-name">
                First name
              </label>
              <input
                className={styles.form_input}
                onChange={(event) => handleChange(event)}
                value={firstName}
                placeholder="Jane"
                id="first-name"
                type="text"
              />
            </div>
            <div className={styles.label_input}>
              <label className={styles.form_label} htmlFor="last-name">
                Last name
              </label>
              <input
                className={styles.form_input}
                onChange={(event) => handleChange(event)}
                value={lastName}
                placeholder="Doe"
                id="last-name"
                type="text"
              />
            </div>
            {!editProfile && (
              <div className={styles.label_input}>
                <label className={styles.form_label} htmlFor="email">
                  Email
                </label>
                <input
                  className={styles.form_input}
                  onChange={(event) => handleChange(event)}
                  value={email}
                  placeholder="you@email.com"
                  id="email"
                  type="email"
                />
              </div>
            )}
            <div className={styles.label_input}>
              <label className={styles.form_label} htmlFor="bio">
                Bio
              </label>
              <input
                className={styles.form_input}
                onChange={(event) => handleChange(event)}
                value={bio}
                placeholder="Describe yourself..."
                id="bio"
                type="text"
              />
            </div>
          </form>
          <div className={styles.button_div}>
            <div className={styles.save_button}>
              <Button
                onClick={handleClick}
                useCase={'Save'}
                form={'profile-form'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
