/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_APP_API_IMAGE_URL,
    },
    images: {
        domains: ['localhost'], // Add other domains if needed
    },
};

export default nextConfig;
