import React, { useState } from 'react';

interface Properties {
  addSkill: boolean;
  setAddSkill: (loggedIn: boolean) => void;
}

export default function SkillForm({ addSkill, setAddSkill }: Properties) {
  function handleClick() {
    // handleClick/submit?
  }
  return (
    <>
      <form id="skill-form">
        <label htmlFor="skill">Skill</label>
        <input placeholder="Python, JavaScript..." name="skill" />
        {/* In future we could convert this to a dropdown menu and allow badges for key high level skills */}
        {/* <select title="Skills dropdown menu" name="skill">
        <option></option>
      </select> */}
        <label htmlFor="experience">Years of experience</label>
        <input placeholder="6 months, 3 years..." name="experience" />
        <label htmlFor="level">Current level</label>
        <input
          placeholder="Beginner, intermediate..."
          name="level"
          type="text"
        />
        {/* Changing experience (in years) to a string in models/backend */}
      </form>
      {/* Need to change this button to button component */}
      <button type="submit" form="skill-form" onClick={handleClick}>
        Save
      </button>
    </>
  );
}
