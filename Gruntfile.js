const sass = require('node-sass');

module.exports = function (grunt) {
    grunt.initConfig({

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        "dist/*.css",
                        "dist/*.js",
                        "*.html"
                    ]
                },
                options: {
                    watchTask: true,
                    server: "./",
                    ui: {
                        port: 8889,
                        weinre: {
                            port: 9999
                        }
                    },
                    port: 8888
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require("autoprefixer")()
                ]
            },
            dist: {
                src: "dist/*.css"
            }
        },
        sass: {
            options: {
                sourceMap: true,
                implementation: sass,
                outputStyle: "compressed"
            },
            dist: {
                files: {
                    "dist/main.min.css": "dev/scss/main.scss"
                }
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                compress: {
                    drop_console: true
                },
                mangle: {
                    reserved: ["jQuery", "Backbone"]
                }
            },
            prod: {
                files: {
                    "dist/app.min.js": ["dev/js/app.js"],
                    "dist/app-functions.min.js": ["dev/js/app-functions.js"]
                }
            }
        },
        watch: {
            css: {
                files: "dev/**/*.scss",
                tasks: ["sass", "postcss:dist"]
            },
            js: {
                files: "dev/**/*.js",
                tasks: ["build-js"]
            }
        }
    });


    grunt.loadNpmTasks("grunt-browser-sync");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", ["browserSync", "watch"]);
    grunt.registerTask("build-css", ["sass", "postcss:dist"]);
    grunt.registerTask("build-js", ["uglify"]);
}; 
