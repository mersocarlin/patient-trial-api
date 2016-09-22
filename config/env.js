const { env } = process;

export default {
  environment: env.NODE_ENV || 'development',
  http: {
    host: env.HTTP_HOST || '0.0.0.0',
    port: env.PORT || env.HTTP_PORT || '4000',
  },
};
