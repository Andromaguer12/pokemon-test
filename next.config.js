const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'en'
  },
  env: {
    NEXT_PUBLIC_APP_LOCAL_BACKEND_API:
      process.env.NEXT_PUBLIC_APP_LOCAL_BACKEND_API,
    NEXT_PUBLIC_APP_PROD_BACKEND_API:
      process.env.NEXT_PUBLIC_APP_PROD_BACKEND_API
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pokeapi.co',
        port: '',
        pathname: 'public/assets/images/projects/**'
      }
    ]
  }
};

module.exports = nextConfig;
