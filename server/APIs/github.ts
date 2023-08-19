import { Octokit } from '@octokit/core';
import 'dotenv/config';

// const KEY = process.env.GITHUB_API_KEY;

// const octokit = new Octokit({
//   auth: KEY
// });

async function fetchRepositories() {
  // console.log('something');
  // const repos = await octokit.request('GET /users/P-C-R-P/repos', {
  //   headers: {
  //     'X-GitHub-Api-Version': '2022-11-28'
  //   }
  // })
  const repos = await fetch('https://api.github.com/users/flores5545/repos', {
    method: 'GET'
  }).then((results) => results.json());
  // console.log('something else');
  console.log(repos);
}

// fetchRepositories();


// fetch to backend
// fetch to api
// get data from api
// filter starred etc
// give to frontend
// allow user to toggle choose/not choose
// when saved they are sent to backend
// saved to database

// when we edit: fetch to backend
// fetch fom db
// give ones that are already there
// fetch
// fetch from github api
// filter

export { fetchRepositories };