import React, {useState} from 'react';

export default function ProfileForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.name) {
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
  return (
    <>
      <form id="profile-form" onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="first-name">First name</label>
        <input
          onChange={(event) => handleChange(event)}
          value={firstName}
          placeholder="Jane"
          name="first-name"
          type="text"
        />
        <label htmlFor="last-name">Last name</label>
        <input
          onChange={(event) => handleChange(event)}
          value={lastName}
          placeholder="Doe"
          name="last-name"
          type="text"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={(event) => handleChange(event)}
          value={email}
          placeholder="you@email.com"
          name="email"
          type="email"
        />
        <label htmlFor="bio">Bio</label>
        <input
          onChange={(event) => handleChange(event)}
          value={bio}
          placeholder="Describe yourself..."
          name="bio"
          type="text"
        />
      </form>
      <button type="submit" form="profile-form">
        Save
      </button>
    </>
  );
}
