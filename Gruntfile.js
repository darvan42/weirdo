/**
 *
 * @param grunt {IGrunt}
 */
module.exports = function (grunt) {
  // Import credentials from config file
  const config = require('./screeps_credentials.json')

  // Get config from parameters or use options from file
  const branch = grunt.option('branch') || config.branch
  const email = grunt.option('email') || config.email
  const token = grunt.option('token') || config.token

  grunt.loadNpmTasks('grunt-screeps')

  grunt.initConfig({
    screeps: {
      options: {
        email: email,
        token: token,
        branch: branch
      },
      dist: {
        src: ['src/*.js']
      }
    }
  })
}
