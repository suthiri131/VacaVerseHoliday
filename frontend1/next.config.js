/** @type {import('next').NextConfig} */
const withCSS = require('@zeit/next-css');
const nextConfig = {
    env: {
      // Define your environment variables here
      SERVER_BASE_URL: process.env.SERVER_BASE_URL,
      // Add more variables as needed
    },
  };
  
  module.exports = nextConfig;
  