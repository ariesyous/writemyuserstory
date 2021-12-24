module.exports = {
  theme: {
    fontFamily: {
      'sans': ['Inter'],
      'body': ['Inter']
    }
  },
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  }
}