var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');


gulp.task('default', function(){
    nodemon({
        script: 'serverNode.js',
        ext: 'js',
        env: {
            PORT:8081
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});