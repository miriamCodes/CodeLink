import React, { useState } from 'react';
import styles from '@/app/styles/skill-form.module.css';
import Button from '@/app/components/button';
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
      body: JSON.stringify({ id: 1, skill, experience, level }),
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
      <div className={styles.skill_div}>
        <h2 className={styles.skill_title}>Add a skill:</h2>
        <form
          className={styles.skill_form}
          id="skill-form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className={styles.label_input}>
            <label className={styles.label} htmlFor="skill">
              Skill
            </label>
            <input
              className={styles.input}
              placeholder="Python, JavaScript..."
              name="skill"
              type="text"
              onChange={(event) => handleChange(event)}
            />
          </div>
          {/* In future we could convert this to a dropdown menu and allow badges for key high level skills */}
          {/* <select title="Skills dropdown menu" name="skill">
        <option></option>
      </select> */}
          <div className={styles.label_input}>
            <label className={styles.label} htmlFor="experience">
              Experience
            </label>
            <input
              className={styles.input}
              placeholder="6 months, 3 years..."
              name="experience"
              type="text"
              onChange={(event) => handleChange(event)}
            />
          </div>
          <div className={styles.label_input}>
            <label className={styles.label} htmlFor="level">
              Current level
            </label>
            <input
              className={styles.input}
              placeholder="Beginner, intermediate..."
              name="level"
              type="text"
              onChange={(event) => handleChange(event)}
            />
          </div>
          {/* Changing experience (in years) to a string in models/backend */}
        </form>
        {/* Need to change this button to button component */}
        <div className={styles.button_div}>
          <div className={styles.save_button}>
            <Button useCase={'Save'} form={'skill-form'} />
          </div>
          {/* <button type="submit" form="skill-form">
        Save
      </button> */}
        </div>
      </div>
  );
}
