/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return isDev ? {
            beforeFiles: [{
                source: '/api/:path*',
                destination: 'https://agua.quepasaorgiva.com/api/:path*'
            }]
        } : null
    }
}

module.exports = nextConfig
