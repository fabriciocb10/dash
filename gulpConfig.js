var config = {
    serverPort: 8000,

    serverRoot: './client/public/',

    staticIndex: './client/public/index.html',

    js: {
        app: {
            src: ['./client/app/app.main.js', './client/app/**/*.module.js', './client/app/**/*.js'],
            outputName: 'app.js',
            dest: './client/public/src/js/'
        },

        vendor: {
            src: './bower.json',
            outputName: 'vendor.js',
            dest: './client/public/src/js/'
        } 
    },

    sass: {
        src: './client/scss/style.scss',
        outputStyle: 'compressed',
        dest: './client/public/src/css/'
    },

    htmlTemplate: {
        src: './client/app/**/*.html',
        dest: './client/app/'
    },

    watch: {
        js: './client/app/**/*.js',
        sass: './client/scss/**/*.scss',
        templates: ['./client/public/index.html', './client/app/**/*.html']
    },

    del: './client/public/src/**/*.map'
};

module.exports = config;