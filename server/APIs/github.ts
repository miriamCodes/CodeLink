async function fetchRepositories(username: string) {
  const repos = await fetch(`https://api.github.com/users/${username}/repos`, {
    method: 'GET'
  }).then((results) => results.json());
  return repos;
}

export { fetchRepositories };