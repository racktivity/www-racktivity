module.exports = function(grunt) {
    grunt.registerTask('build-index', require('./grunt/build-index')(grunt));
    grunt.registerTask('default', ['build-index']); // in case you're lazy and just want to do 'grunt'
};