import { useEffect, useState } from 'react';
import PortfolioForm from './portfolio-form';
import ButtonDiv from './button-div';
import PortfolioDiv from './portfolio-div';

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
        id: number;
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
        id: number;
        experience: string;
        level: string;
        programmingSkill: string;
      }
    ];
  }) => void;
  addSkill: boolean;
  setAddSkill: (addSkill: boolean) => void;
  editProfile: boolean;
  setEditProfile: (editProfile: boolean) => void;
}

export default function Portfolio({
  profile,
  setProfile,
  addSkill,
  setAddSkill,
  editProfile,
  setEditProfile,
}: Properties) {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [toggle, setToggle] = useState(0);
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
    // consider putting fetches in external file
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

  useEffect(() => {
    if (toggle > 0) {
      const portfolioRerender = async () => {
        await handlePortfolio();
      };
      portfolioRerender();
    }
  }, [toggle]);

  function handleState() {
    setPortfolioForm(!portfolioForm);
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

  // separate file
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
      {portfolioForm && (
        <PortfolioForm handleState={handleState} repos={repos} setRepos={setRepos} convertDate={convertDate} showPortfolio={showPortfolio} setShowPortfolio={setShowPortfolio} setPortfolioForm={setPortfolioForm} portfolioForm={portfolioForm} />
      )}
      <div>
        <ButtonDiv addSkill={addSkill} setAddSkill={setAddSkill} editProfile={editProfile} setEditProfile={setEditProfile} handleState={handleState} handlePortfolio={handlePortfolio} />
      </div>
      {showPortfolio && (
        <PortfolioDiv toggle={toggle} setToggle={setToggle} showPortfolio={showPortfolio} setShowPortfolio={setShowPortfolio} portfolioForm={portfolioForm} setPortfolioForm={ setPortfolioForm } convertDate={convertDate} portfolio={portfolio} setPortfolio={setPortfolio} />
      )}
    </div>
  );
}
