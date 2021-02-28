/**
 *
 * @param grunt {IGrunt}
 */
module.exports = function (grunt) {

  //Import credentials from config file
  let config = require('./screeps_credentials.json')

  //Get config from parameters or use options from file
  let branch = grunt.option('branch') || config.branch
  let email = grunt.option('email') || config.email
  let token = grunt.option('token') || config.token

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