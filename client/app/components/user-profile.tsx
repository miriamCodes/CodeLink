import React, { useEffect, useState } from 'react';

export default function UserProfile() {
    const [profile, setProfile] = useState({});
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
  // useEffect(() =>
  //   await fetch('http://localhost:3001/profile', {

  //   })
  // )
  return (
    <div>

  </div>);
}
