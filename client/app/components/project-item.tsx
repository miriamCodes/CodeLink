import Link from 'next/link';
import styles from '@/app/styles/project-item.module.css';

interface Properties {
  selectedRepos: {
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
  setSelectedRepos: (
    selectedRepos: {
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
  convertDate: (date: string) => string;
}

export default function ProjectItem({
  selectedRepos,
  setSelectedRepos,
  repos,
  setRepos,
  convertDate
}: Properties) {
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

  return (
    <div className={styles.repos}>
      {repos.map((repo) => (
        <div className={styles.select_repo} key={repo.id}>
          <Link
            className={styles.link}
            href={`https://github.com/${profile.user.gitHub}/${repo.name}`}
          >
            <p className={styles.repo_details}>{repo.name}</p>
          </Link>
          <p className={styles.repo_details} key={repo.language}>
            {repo.language}
          </p>
          <p className={styles.repo_details} key={repo.created_at}>
            {convertDate(repo.created_at)}
          </p>
          <button
            className={styles.add_button}
            type="submit"
            onClick={() => handleSavedRepos(repo)}
          >
            {repo.select ? '-' : '+'}
          </button>
        </div>
      ))}
    </div>
  );
}
