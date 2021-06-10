module.exports = {
  async redirects() {
    return [
      {
        source: '/createEvents',
        destination: '/events',
        permanent: true,
      },
    ]
  },
}
