import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      API_KEY: process.env.API_KEY,
    },
  };
};
