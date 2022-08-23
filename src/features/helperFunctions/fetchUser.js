export const getUser = async (user, setState) => {
  const followersUrl = `https://api.github.com/users/${user}/followers`;
  const followingUrl = `https://api.github.com/users/${user}/following`;

  const response = await Promise.all(
    [followersUrl, followingUrl].map(async (url) => {
      const fetchResponse = await fetch(url);
      const resultResponse = await fetchResponse.json();
      return resultResponse;
    })
  );

  setState(response);
};
