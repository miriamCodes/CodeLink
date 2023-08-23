import styles from '@/app/styles/button-div.module.css';

interface Properties {
  addSkill: boolean;
  setAddSkill: (addSkill: boolean) => void;
  editProfile: boolean;
  setEditProfile: (editProfile: boolean) => void;
  handleState: () => void;
  handlePortfolio: () => Promise<void>;
}

export default function ButtonDiv({addSkill, setAddSkill, editProfile, setEditProfile, handleState, handlePortfolio}: Properties) {
  function handleButtonClick(event: React.MouseEvent<HTMLElement>) {
    if (event.target.id === 'skill') setAddSkill(true);
    if (event.target.id === 'edit') setEditProfile(true);
  }

  return (
    <div className={styles.button_div}>
      <button className={styles.button} onClick={handleState}>
        Add to portfolio
      </button>
      <button className={styles.button} onClick={handlePortfolio}>
        My portfolio
      </button>
      <button
        className={styles.button}
        id="skill"
        onClick={(event) => handleButtonClick(event)}
      >
        Add skill
      </button>
      <button
        className={styles.button}
        id="edit"
        onClick={(event) => handleButtonClick(event)}
      >
        Edit profile
      </button>
    </div>
  );
}
