type Config = {
  GRAPHQL_URL: string;
  SUBSCRIPTION_URL: string;
};

const config = {
  GRAPHQL_URL: process.env.GRAPHQL_URL,
  SUBSCRIPTION_URL: process.env.SUBSCRIPTION_URL,
};

export default config as Config;
