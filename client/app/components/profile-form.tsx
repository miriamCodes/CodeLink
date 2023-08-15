import React, { useState } from 'react';

export default function ProfileForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  async function handleSubmit() {
    await fetch('localhost:3001/create-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstName, lastName, email, bio}),
    }).then((res) => res.json());
    setFirstName('');
    setLastName('');
    setEmail('');
    setBio('');
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.name) {
      case 'first-name':
        setFirstName(event.target.value);
      case 'last-name':
        setLastName(event.target.value);
      case 'email':
        setEmail(event.target.value);
      case 'bio':
        setBio(event.target.value);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first-name">First name</label>
        <input
          onChange={() => handleChange}
          value={firstName}
          placeholder="Jane"
          name="first-name"
          type="text"
        />
        <label htmlFor="last-name">Last name</label>
        <input
          onChange={() => handleChange}
          value={lastName}
          placeholder="Doe"
          name="last-name"
          type="text"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={() => handleChange}
          value={email}
          placeholder="you@email.com"
          name="email"
          type="email"
        />
        <label htmlFor="bio">Bio</label>
        <input
          onChange={() => handleChange}
          value={bio}
          placeholder="Describe yourself..."
          name="bio"
          type="text"
        />
      </form>
      <button type="submit" form="skill-form">
        Save
      </button>
    </>
  );
}
