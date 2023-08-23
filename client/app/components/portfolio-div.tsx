import Link from "next/link";

interface Properties {
  toggle: number;
  setToggle: (toggle: number) => void;
  showPortfolio: boolean;
  setShowPortfolio: (showPortfolio: boolean) => void;
  portfolioForm: boolean;
  setPortfolioForm: (portfolioForm: boolean) => void;
  convertDate: (date: string) => string;
  portfolio: {
    id: string;
    name: string;
    description: string;
    updatedAt: string;
    createdAt: string;
    stars: string;
    watchers: string;
    language: string;
  }[];
  setPortfolio: (
    portfolio: {
      id: string;
      name: string;
      description: string;
      updatedAt: string;
      createdAt: string;
      stars: string;
      watchers: string;
      language: string;
    }[]
  ) => void;
}


export default function PortfolioDiv({toggle, setToggle, showPortfolio, setShowPortfolio, portfolioForm, setPortfolioForm, convertDate, portfolio, setPortfolio}: Properties) {
  async function handleRepoDelete(repo) {
    await fetch('http://localhost:3001/delete-repo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: repo.id }),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
    setToggle(toggle + 1);
  }
  // not dry
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
          <div className={styles.github_link}>
            <Link
              className={styles.link}
              href={`https://github.com/${profile.user.gitHub}/${p.name}`}
            >
              <p key={p.name}>Check out the project on GitHub</p>
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
          <button
            className={styles.small_button}
            onClick={() => handleRepoDelete(p)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
