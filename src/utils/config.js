const BASE_URL = 'http://localhost:5210';

const configuration = ({ method, path, data, params }) => ({
  method: method,
  url: `${BASE_URL}${path}`,
  data: data,
  params,
});

export default configuration;
