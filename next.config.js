/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    COMMIT_HASH: process.env.COMMIT_HASH
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    JWT_SUBJECT: process.env.JWT_SUBJECT || 'JWT_SUBJECT',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    DEPLOY_ENV: process.env.DEPLOY_ENV || 'dev',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  }
}
