async function fetchRepositories(username: string) {
  const repos = await fetch(`https://api.github.com/users/${username}/repos`, {
    method: 'GET'
  })
    .then((results) => results.json())
    .catch(err => console.log(err));
  return repos;
}

export { fetchRepositories };