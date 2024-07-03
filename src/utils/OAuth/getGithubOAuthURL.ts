function getGithubOAuthUrl() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_OAUTH_GITHUB_CLIENT_ID;
  const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_REDIRECT_URL;

  return `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${SERVER_ENDPOINT}/oauth/github&scope=user:email`;
}

export { getGithubOAuthUrl };
