/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    COMMIT_HASH: process.env.COMMIT_HASH
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    JWT_SUBJECT: process.env.JWT_SUBJECT || '0e774279-cadc-4a1d-8e75-c3bc07926d98',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    DEPLOY_ENV: process.env.DEPLOY_ENV || 'dev',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  }
}
