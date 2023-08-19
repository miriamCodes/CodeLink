import { useEffect, useState } from "react"

interface Properties {
  profile: {
    bio: string,
    user: { firstName: string, lastName: string, email: string, gitHub: string },
    skill: [
      {
        experience: string,
        level: string,
        programmingSkill: string,
      },
    ],
  };
  setProfile: (profile: {
    bio: string,
    user: { firstName: string, lastName: string, email: string, gitHub: string },
    skill: [
      {
        experience: string,
        level: string,
        programmingSkill: string,
      },
    ],
  }) => void;
}

export default function Portfolio({ profile, setProfile }: Properties) {
  const [repos, setRepos] = useState([]);
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
  }, [profile.user.gitHub])
  return (
    <div>
      {repos.map((repo) => (
        <div key="repo">
          <p key={repo.name}>{repo.name}</p>
        </div>
      ))}
    </div>
  )
};