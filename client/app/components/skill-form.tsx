import React, { useState } from 'react';

interface Properties {
  addSkill: boolean;
  setAddSkill: (loggedIn: boolean) => void;
}

export default function SkillForm({ addSkill, setAddSkill }: Properties) {
  const [skill, setSkill] = useState('');
  const [experience, setExperience] = useState('');
  const [level, setLevel] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      await fetch('http://localhost:3001/create-skill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 9, skill, experience, level }),
      })
        .then((res) => res.json())
        .catch((error) => console.log(error));
      setAddSkill(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.name) {
      case 'skill':
        setSkill(event.target.value);
        break;
      case 'experience':
        setExperience(event.target.value);
        break;
      case 'level':
        setLevel(event.target.value);
        break;
    }
  }
  return (
    <>
      <form id="skill-form" onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="skill">Skill</label>
        <input
          placeholder="Python, JavaScript..."
          name="skill"
          type="text"
          onChange={(event) => handleChange(event)}
        />
        {/* In future we could convert this to a dropdown menu and allow badges for key high level skills */}
        {/* <select title="Skills dropdown menu" name="skill">
        <option></option>
      </select> */}
        <label htmlFor="experience">Experience in months</label>
        <input
          placeholder="6 months, 3 years..."
          name="experience"
          type="text"
          onChange={(event) => handleChange(event)}
        />
        <label htmlFor="level">Current level</label>
        <input
          placeholder="Beginner, intermediate..."
          name="level"
          type="text"
          onChange={(event) => handleChange(event)}
        />
        {/* Changing experience (in years) to a string in models/backend */}
      </form>
      {/* Need to change this button to button component */}
      <button type="submit" form="skill-form">
        Save
      </button>
    </>
  );
}
