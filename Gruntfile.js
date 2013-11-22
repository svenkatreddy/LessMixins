var path = require('path');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    clean: ["dist"],
    copy: {
        all: {
            files: [
                {expand: true,
                 cwd: 'source',
                 src: ['./**/*.js', './**/*.json', './**/*.html','./**/*.less'],
                 dest: 'dist/'},
                 {expand: true,
                  cwd: 'source',
                  src: ['./css/*.css','./css/images/**/*'],
                  dest: 'dist/'}
            ]
        }
    },
    less: {
      all: {
        files: [{
          expand: true,
          cwd: 'source/less',
          src: '**/*.less',
          dest: 'dist/css/',
          ext: '.css'
        }]
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    express: {
      all: {
        options: {
          port: process.env.PORT, // change this to whatever port 
         // hostname: "0.0.0.0",
          bases: ['./dist'],
          //server: path.resolve('./server'),
          livereload: true,
          serverreload: false
        }
      }
    },
    open: {
      all: {
        path: 'http://localhost:9000/index.html'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      copy: {
        files: ['source/**/*.html',
                'source/**/*.js',
                'source/**/*.json',
                'source/**/*.css',
                'source/css/images/**.*'],
        tasks: ['copy'],
        options: { spawn: false}
      },
      less: {
        files: ['source/less/*.less'],
        tasks: ['less'],
        options: { spawn: false }
      },
    },
   
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-dust');

  // Default task.
  grunt.registerTask('default', ['copy', 'less', 'watch']);

  grunt.registerTask('server', ['copy', 'less', 'express', 'open', 'watch']);

};



