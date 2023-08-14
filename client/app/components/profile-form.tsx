import React, { useState } from 'react';

export default function ProfileForm() {
  function handleClick() {
    // Handle click should be handle submits
  }
  return (
    <>
      <form>
        <label htmlFor="first-name">First name</label>
        <input placeholder="Jane" name="first-name" type="text" />
        <label htmlFor="last-name">Last name</label>
        <input placeholder="Doe" name="last-name" type="text" />
        <label htmlFor="email">Email</label>
        <input placeholder="you@email.com" name="email" type="email" />
        <label htmlFor="bio">Bio</label>
        <input placeholder="Describe yourself..." name="bio" type="text" />
      </form>
      <button type="submit" form="skill-form" onClick={handleClick}>
        Save
      </button>
    </>
  );
}
