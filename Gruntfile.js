module.exports = function(grunt) {
    grunt.initConfig({

        asset_dir: 'assets',
        compile_dir: 'build',
        release_dir: 'release',
        remote_dir: '.',
        src: {
            game: [
                "lib/phaser-no-physics.js",
                "lib/gtlib.js",
                "lib/utils/ArrayUtil.js",
                "lib/utils/FontUtil.js",
                "lib/utils/LangUtil.js",

                "lib/TextButton.js",
                "lib/CategoryButton.js",
                "lib/ShiningCategoryButton.js",
                "lib/IconWithLabel.js",
                "lib/LabelWithIcon.js",
                "lib/DynamicToolTip.js",
                "lib/SpeechBubble.js",
                "lib/LabelWithValue.js",
                "lib/LabelPanel.js",

                "src/Boot.js",
                "src/Preloader.js",
                "src/Game.js",

                "src/config/Assets.js",
                "src/config/Config.js",
                "src/config/Player.js",
                "src/config/Tweens.js",
                "src/config/LangTokens.js",

                "src/enums/BodyPart.js",
                "src/enums/ClothingStyle.js",
                "src/enums/DropZone.js",
                "src/enums/Faction.js",

                "src/screens/Screen.js",
                "src/screens/StartScreen.js",
                "src/screens/GameOver.js",

                "src/utils/FormatUtil.js",
                "src/utils/LabelUtil.js"

            ]
        },

        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9001,
                    keepalive: true
                }
            }
        },
        jshint: {
            // define the files to lint
            files: ['Gruntfile.js', 'src/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: false,
                    console: true,
                    module: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['test']
        },
        clean: {
            build:['<%= compile_dir %>'],
            release:[
                '<%= release_dir %>/<%= asset_dir %>',
                '<%= release_dir %>/**/*.js'
            ]
            //dist:[
            //    '<%= dist_dir %>/<%= asset_dir %>',
            //    '<%= dist_dir %>/**/*.js'
            //],
            //cocoon:[
            //    '<%= cocoon_dir %>/<%= asset_dir %>',
            //    '<%= cocoon_dir %>/**/*.js'
            //],
            //audio:[
            //    '<%= cocoon_dir %>/<%= asset_dir %>/audio/m4a/',
            //    '<%= cocoon_dir %>/<%= asset_dir %>/audio/ogg/'
            //]
        },
        concat: {
            game: {
                options: {
                    process: {
                        data: {
                            version: '<%= pkg.version %>',
                            buildDate: '<%= grunt.template.today() %>'
                        }
                    }
                },
                src: ['<%= src.game %>'],
                dest: '<%= compile_dir %>/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= release_dir %>/<%= pkg.name %>.min.js': ['<%= concat.game.dest %>']
                }
            }
        },
        copy: {
            release: {
                src: '<%= asset_dir %>/**',
                dest: '<%= release_dir %>/'
            },
            platform: {
                files: [{
                    src: '<%= asset_dir %>/content.json',
                    dest: '/Users/daniel/workspace/spf/src/Spf/Bundle/TalentGameBundle/DataFixtures/ORM/content.json'
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= release_dir %>/',
                    dest: '/Users/daniel/workspace/spf/src/Spf/Bundle/TalentGameBundle/Resources/public/game/',
                    src: '**/*'
                }]
            }
            //dist: {
            //    expand: true,
            //    cwd: '<%= release_dir %>/',
            //    src: ['**','!*.html'],
            //    dest: '<%= dist_dir %>/'
            //},
            //cocoon: {
            //    expand: true,
            //    cwd: '<%= dist_dir %>/',
            //    src: ['<%= asset_dir %>/**', '**/*.js','!*.html'],
            //    dest: '<%= cocoon_dir %>/'
            //}
        },
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'lernetz.gentletroll.com',
                    port: 21,
                    authKey: 'key1'
                },
                src: '<%= release_dir %>/',
                dest: '<%= remote_dir %>/',
                exclusions: ['<%= release_dir %>/**/.DS_Store', '<%= release_dir %>/**/Thumbs.db', '<%= release_dir %>/tmp']
            }
        }
        //compress: {
        //  game: {
        //    options: {
        //      archive: '<%= cocoon_dir %>/game.zip'
        //    },
        //    files: [
        //      {
        //        expand: true,
        //        cwd: '<%= cocoon_dir %>/',
        //        src: ['**', '!*.zip'],
        //        dest: './'
        //      }
        //    ]
        //  }
        //}
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('serve', ['connect']);

    grunt.registerTask('build', ['jshint', 'clean:build', 'concat']);

    grunt.registerTask('release', ['build', 'clean:release', 'uglify', 'copy:release']);

    grunt.registerTask('release-platform', ['release', 'copy:platform']);

    //grunt.registerTask('dist', ['release', 'clean:dist', 'copy:dist']);

    //grunt.registerTask('pack', ['dist', 'clean:cocoon', 'copy:cocoon','clean:audio','compress:game']);

    grunt.registerTask('deploy', ['release', 'ftp-deploy']);

};