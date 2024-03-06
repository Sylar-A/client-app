/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    compiler: {
        styledComponents: true
    },
    publicRuntimeConfig: {
        APP_GRAPHQL_URL: "/graphql"
    },
    poweredByHeader: false
};

export default nextConfig;
