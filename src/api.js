const apiURL = process.env.REACT_APP_API_URL;

if (!apiURL) {
  // eslint-disable-next-line no-console
  console.error('An error occurred! Please check your connection');
}

const fetchToJson = async (url, options = { method: 'GET' }) => {
  const response = await fetch(url, {
    ...options,
  });

  if (!response.ok) {
    throw Error(`${response.status}  ${response.statusText}`);
  }
  return response.json();
};

// Initiatives
export const getInitiatives = () =>
  fetchToJson(`${apiURL}/initiatives`);