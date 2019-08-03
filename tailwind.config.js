module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'outline-green': '0 0 0 3px rgba(68, 225, 66, .5)',
        'outline-orange': '0 0 0 3px rgba(225, 139, 66, .5)',
        'outline-purple': '0 0 0 3px rgba(208, 66, 225, .5)',
        'outline-red': '0 0 0 3px rgba(225, 66, 66, .5)',
        'outline-teal': '0 0 0 3px rgba(66, 218, 225, .5)',
      },
      colors: {
        'blue-1000': '#162c4a',
      }
    },
    spinner: () => ({
      default: {
        color: '#dae1e7',
        size: '1.25rem',
        border: '2px',
        speed: '500ms'
      },
    })
  },
  variants: {
    backgroundColor: ['focus', 'focus-within', 'hover'],
    borderColor: ['focus-within'],
    cursor: ['hover'],
  },
  plugins: [
  ]
}
