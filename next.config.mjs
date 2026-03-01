import { withPayload } from '@payloadcms/next/withPayload'

const s3Endpoint = process.env.S3_ENDPOINT ? new URL(process.env.S3_ENDPOINT) : undefined
const serverUrl = process.env.SERVER_URL ? new URL(process.env.SERVER_URL) : undefined

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      ...(serverUrl
        ? [{ protocol: serverUrl.protocol.slice(0, -1), hostname: serverUrl.hostname }]
        : []),
      ...(s3Endpoint
        ? [{ protocol: s3Endpoint.protocol.slice(0, -1), hostname: s3Endpoint.hostname }]
        : []),
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
