import { useEffect, useState } from 'react';
import styles from '@/app/styles/portfolio.module.css';
import Link from 'next/link';

interface Properties {
  profile: {
    bio: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      gitHub: string;
    };
    skill: [
      {
        experience: string;
        level: string;
        programmingSkill: string;
      }
    ];
  };
  setProfile: (profile: {
    bio: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      gitHub: string;
    };
    skill: [
      {
        experience: string;
        level: string;
        programmingSkill: string;
      }
    ];
  }) => void;
}

// WE HAVE TO THINK OF A WAY TO SEND ID OF SPECIFIC PROFILE
export default function Portfolio({ profile, setProfile }: Properties) {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [repos, setRepos] = useState([
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
  const [portfolioForm, setPortfolioForm] = useState(false);
  const [portfolio, setPortfolio] = useState([
    {
      id: '',
      name: '',
      description: '',
      updatedAt: '',
      createdAt: '',
      stars: '',
      watchers: '',
      language: '',
    },
  ]);

  useEffect(() => {
    const username = profile.user.gitHub;
    const fetchRepos = async () => {
      await fetch(`http://localhost:3001/repos/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setRepos(data))
        .catch((error) => console.log(error));
    };
    fetchRepos();
  }, [profile.user.gitHub]);

  function handleState() {
    setPortfolioForm(!portfolioForm);
  }

  function handleSavedRepos(repo) {
    repo.select = !repo.select;
    if (repo.select) {
      setSelectedRepos((repos) => [...repos, repo]);
    } else {
      const index = selectedRepos.indexOf(repo);
      selectedRepos.splice(index, 1);
      setSelectedRepos((repos) => [...repos]);
    }
  }
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

  async function handlePortfolio() {
    setShowPortfolio(true);
    const id = 1;
    await fetch(`http://localhost:3001/portfolio/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setPortfolio(data))
      .catch((error) => console.log(error));
  }

  function handleDiv(event) {
    if (
      event.target.id !== 'project-div' &&
      event.target.id === 'portfolio-div'
    )
      setShowPortfolio(false);
  }

  function handleProject() {
    setShowPortfolio(true);
  }

  function convertDate(date: string) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formatted = new Date(date).toLocaleDateString('en-UK', options);
    const date_parts = formatted
      .substring(0, formatted.indexOf(','))
      .split(' ')
      .reverse()
      .join(' ');
    const formatted_date =
      date_parts + formatted.substring(formatted.indexOf(',') + 1);
    return formatted_date;
  }

  return (
    <div>
      <div>
        <div className={styles.button_div}>
          <button className={styles.button} onClick={handleState}>
            Add to portfolio
          </button>
          <button className={styles.button} onClick={handlePortfolio}>
            My portfolio
          </button>
        </div>
        {portfolioForm && (
          <div>
            {repos.map((repo) => (
              <div key={repo.id}>
                <p key={repo.name}>{repo.name}</p>
                <p key={repo.created_at}>{convertDate(repo.created_at)}</p>
                <button type="submit" onClick={() => handleSavedRepos(repo)}>
                  {repo.select ? '-' : '+'}
                </button>
              </div>
            ))}
            <button onClick={handleClick}>Save</button>
          </div>
        )}
      </div>
      {showPortfolio && (
        <div
          className={styles.portfolio_div}
          id="portfolio-div"
          onClick={(event) => handleDiv(event)}
        >
          {portfolio.map((p) => (
            <div id="project-div" className={styles.project_div} key={p.id}>
              <div className={styles.title_div}>
                <p className={styles.title} key={p.name}>
                  {p.name}
                </p>
              </div>
              <div className={styles.label_details}>
                <p className={styles.label}>On GitHub: </p>
                <Link
                  className={styles.details}
                  href={`https://github.com/${profile.user.gitHub}/${p.name}`}
                >
                  <p
                    className={styles.link}
                    key={`https://github.com/${profile.user.gitHub}/${p.name}`}
                  >
                    {`https://github.com/${profile.user.gitHub}/${p.name}`}
                  </p>
                </Link>
              </div>
              {p.description && (
                <div className={styles.label_details}>
                  <p className={styles.label}>Project description: </p>
                  <p className={styles.details} key={p.description}>
                    {p.description}
                  </p>
                </div>
              )}
              <div className={styles.label_details}>
                <p className={styles.label}>Project language: </p>
                <p className={styles.details} key={p.language}>
                  {p.language}
                </p>
              </div>
              <div className={styles.label_details}>
                <p className={styles.label}>First published: </p>
                <p className={styles.details} key={p.createdAt}>
                  {convertDate(p.createdAt)}
                </p>
              </div>
              <div className={styles.label_details}>
                <p className={styles.label}>Last updated: </p>
                <p className={styles.details} key={p.updatedAt}>
                  {convertDate(p.updatedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
