const BASE_URL = 'http://dsc-backend-api.azurewebsites.net';

const configuration = ({ method, path, data, params }) => ({
  method: method,
  url: `${BASE_URL}${path}`,
  data: data,
  params,
});

export default configuration;
