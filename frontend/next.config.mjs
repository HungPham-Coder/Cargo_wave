/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
    },
    // eslint: {
    //     ignoreDuringBuilds: true,
    //   },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/:path*',
    //             destination: 'http://localhost:3001/:path*', // Proxy đến Backend
    //         },
    //     ];
    // },
};

export default nextConfig;
