/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    rewrites: isDev ? async () => {
        return {
            beforeFiles: [{
                source: '/api/:path*',
                destination: 'https://agua.quepasaorgiva.com/api/:path*'
            }]
        }
    } : undefined
}

module.exports = nextConfig
