import { useState } from 'react';
import styles from '@/app/styles/portfolio-form.module.css';
import ProjectItem from './project-item';

interface Properties {
  showPortfolio: boolean;
  setShowPortfolio: (showPortfolio: boolean) => void;
  portfolioForm: boolean;
  setPortfolioForm: (portfolioForm: boolean) => void;
  convertDate: (date: string) => string;
  repos: {
    id: string;
    name: string;
    description: string;
    updated_at: string;
    created_at: string;
    stargazers_count: string;
    watchers: string;
    language: string;
    select: boolean;
  }[];
  setRepos: (
    repos: {
      id: string;
      name: string;
      description: string;
      updated_at: string;
      created_at: string;
      stargazers_count: string;
      watchers: string;
      language: string;
      select: boolean;
    }[]
  ) => void;
  handleState: () => void;
}

export default function PortfolioForm({
  showPortfolio,
  setShowPortfolio,
  portfolioForm,
  setPortfolioForm,
  convertDate,
  repos,
  setRepos,
  handleState,
}: Properties) {
  const [selectedRepos, setSelectedRepos] = useState([
    {
      id: '',
      name: '',
      description: '',
      updated_at: '',
      created_at: '',
      stargazers_count: '',
      watchers: '',
      language: '',
      select: false,
    },
  ]);
  async function handleClick() {
    await fetch(`http://localhost:3001/create-repos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedRepos }),
    }).catch((error) => console.log(error));
    handleState();
  }
  function handleDiv(event) {
    if (
      event.target.id !== 'project-div' &&
      event.target.id === 'portfolio-div'
    )
      setShowPortfolio(false);
    else if (
      event.target.id !== 'portfolio-form' &&
      event.target.id === 'portfolio-overlay'
    )
      setPortfolioForm(false);
  }
  return (
    <div
      id="portfolio-overlay"
      onClick={(event) => handleDiv(event)}
      className={styles.portfolio_form}
    >
      <div id="portfolio-form" className={styles.unsaved_repos}>
        <ProjectItem convertDate={convertDate} selectedRepos={selectedRepos} setSelectedRepos={setSelectedRepos} repos={repos} setRepos={setRepos} />
        <button className={styles.button} onClick={handleClick}>
          Save
        </button>
      </div>
    </div>
  );
}
