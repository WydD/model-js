// Grunt config
module.exports = function (grunt) {

    // Auto load grunt plugins
    require('load-grunt-config')(grunt);
    // Grunt config
    grunt.initConfig({

        clean: {
            dist: {
                src: 'dist'
            }
        },

        concat: {
            dist: {
                src: ['src/Class.js', 'src/Model.js'],
                dest: 'dist/Model.js'
            }
        },

        uglify: {
            dist: {
                files: [
                    {
                        src: 'dist/Model.js',
                        dest: 'dist/Model.min.js'
                    }
                ]
            }
        }
    });

    grunt.registerTask('dist', [ 'clean:dist', 'concat:dist', 'uglify:dist' ]);
    grunt.registerTask('default', [ 'dist' ]);

};
