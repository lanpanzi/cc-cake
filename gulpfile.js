// 引入模块
const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCss = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const connect = require("gulp-connect");

// 制定任务
gulp.task("default", function() {
	console.log("gulp启动成功");
});
gulp.task("css", function() {
	gulp.src("src/scss/**/*.scss")
		.pipe(sass())
		.pipe(cleanCss())
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
});
gulp.task("html", function() {
	gulp.src("src/**/*.html")
		.pipe(htmlmin({
			removeComments: true, //清除HTML注释
			collapseWhitespace: true, //压缩HTML
			collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
			removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
			removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
			minifyJS: true, //压缩页面JS
			minifyCSS: true //压缩页面CSS
		}))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
});
gulp.task("js", function() {
	gulp.src("src/js/**/*.js")
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
});
gulp.task("static", function(){
	gulp.src("src/static/**/*")
		.pipe(gulp.dest("dist/static"));
}); 
gulp.task("libs", function(){
	gulp.src("src/libs/**/*")
		.pipe(gulp.dest("dist/libs"));
}); 
gulp.task("api", function(){
	gulp.src("src/api/**/*")
		.pipe(gulp.dest("dist/api"));
}); 
gulp.task("connect", function(){
	connect.server({
		port: 8080,
		livereload: true,
		root: "dist"
	});
});
gulp.task("watch", function(){
	gulp.watch("src/scss/**/*.scss", ['css']);
	gulp.watch("src/**/*.html", ['html']);
	gulp.watch("src/js/**/*.js", ['js']);
});

gulp.task("default", ["css", "html", "js", "static", "libs", "api", "connect", "watch"]);