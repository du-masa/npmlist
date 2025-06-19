//プラグインの読み込み
var gulp = require("gulp");
//画像を圧縮するプラグインの読み込み
var imagemin = require("gulp-imagemin");
//cssスプライト用画像を生成するプラグインの読み込み
var spritesmith = require("gulp.spritesmith");
//sassコンパイル用プラグインの読み込み
// var sass = require("gulp-ruby-sass");
var sass = require("gulp-sass");
//ベンダープリフィックス自動付与用プラグインの読み込み
// var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
// スタイルガイドプラグインの読み込み
var frontnote = require("gulp-frontnote");

//画像圧縮のタスク
gulp.task('imageMin',function(){
  gulp.src('images/*.png')
      .pipe(imagemin())
      .pipe(gulp.dest('images/minifide_images/'));
  gulp.src('images/*.jpg')
      .pipe(imagemin())
      .pipe(gulp.dest('images/minifide_images/'));
});



//ccスプライト生成のタスク
gulp.task('spriteSmith', function () {
 var spriteDate = gulp.src('images/sprite_item/*png')
                      .pipe(spritesmith({
                       imgName: 'icon.png', //スプライトの画像
                       cssName: '_sprite.scss',//生成されるscssファイル
                       imgPath: '../images/sprite/icon.png',//生成されるscssに記載されるスプライトファイルのパス
                       cssFormat: 'scss',
                       cssVarMap: function (sprite) {
                        sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
                       }
                      }));
 spriteDate.img.pipe(gulp.dest('images/sprite/')); //imgNameで指定したスプライト画像の保存先
 spriteDate.css.pipe(gulp.dest('sass/')); //cssNameで指定したcssの保存先
});

//sassコンパイルのタスク
gulp.task('sass', function () {
    gulp.src('scss/**/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
         }))
        .pipe(gulp.dest('css/'));
});


//監視
gulp.task('default',function(){
  gulp.watch('scss/**/*.scss',['sass']);
});

console.log('logger');
console.log('logger');
console.error('error');