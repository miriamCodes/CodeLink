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

// WE HAVE TO THINK OF A WAY TO SEND ID OF SPECIFIC PROFILE
export default function Portfolio({ profile, setProfile }: Properties) {
  const [repos, setRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [portfolioForm, setPortfolioForm] = useState(false);
  const [portfolio, setPortfolio] = useState([]);


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

  function handleSavedRepos(repo){
    console.log(repo);
    repo.select = !repo.select;
    console.log(repo.select);
    if (repo.select) {
      setSelectedRepos(repos => [...repos, repo]);
    } else {
      const index = selectedRepos.indexOf(repo);
      selectedRepos.splice(index, 1);
      setSelectedRepos(repos => [...repos]);
    }
  }
  console.log(selectedRepos);
  

  async function handleClick() {
    await fetch(`http://localhost:3001/create-repos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedRepos }),
    })
      .catch((error) => console.log(error));
    handleState();
  };

  async function handlePortfolio() {
    const id = 1;
    await fetch(`http://localhost:3001/portfolio/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => setPortfolio(data))
      .catch((error) => console.log(error));
    console.log(portfolio);
    
  };

  function convertDate(date: string) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formatted = (new Date(date)).toLocaleDateString('en-UK', options);
    const date_parts = formatted.substring(0, formatted.indexOf(",")).split(" ").reverse().join(" ");
    const formatted_date = date_parts + formatted.substring(formatted.indexOf(",") + 1);
    return formatted_date;
  }

  return (
    <div>
      <div>
        <button onClick={handleState}>Create portfolio</button>
        {portfolioForm && (
          <div>
            {repos.map((repo) => (
              <div key={repo.id}>
                <p key={repo.name}>{repo.name}</p>
                <p key={repo.created_at}>{convertDate(repo.created_at)}</p>
                <button onClick={() => handleSavedRepos(repo)}>{repo.select ? '-' : '+'}</button>
              </div>
            ))}
            <button onClick={handleClick}>Save</button>
          </div>
        )}
      </div>
      <div>
        <button onClick={handlePortfolio}>My portfolio</button>
      </div>
      {portfolio.length > 0 && (
        <div>
          {portfolio[0].name}
        </div>
      )}
    </div>
  )
};