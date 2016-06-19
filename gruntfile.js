module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/src/*.js'],
        dest: 'js/build/script.main.min.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'js/build/script.main.min.js': ['js/build/script.main.min.js']
        }
      }
    },
    sass: {
      options: {
          sourceMap: false
      },
      dist: {
          files: {
              'css/build/main.css': 'css/src/main.scss'
          }
      }
    },
    watch: {
      sass: {
        files: ['css/src/*.scss'],
        tasks: ['sass']

      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'uglify','sass']);

};