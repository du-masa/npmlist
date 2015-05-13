(function(){
   
   //======変数======//

   var digit,//桁数を表す変数
       saveDigit, //現在の桁数を保存する変数
       nums = [3, 5], //特定の倍数一覧の配列
       resultNums = [], //割り切れた数値を入れる配列
       count,
       say; //　おかしくなるセリフ

   //======実際の処理======//

   //処理開始
   console.time("処理時間");

   dates("開始時間:");
   for(count = 100; count > 0; count--){
      // 数値の長さを取得し、前の桁数と同じでなければ出力
      digit = count.toString().length;
      if(digit != saveDigit){
         console.log("[" + digit + "桁じゃん？]");
         saveDigit = digit;
      }

      //数値の表示、特定の倍数でおかしくなる      
      counts(count);
   }

   dates("終了時間:");

   console.timeEnd("処理時間");
   //処理終了

   //======関数======//

   // 倍数を調べ出力する関数
   function counts(count){
      // 割り切れた時その数値を新しい配列resultNumsに入れる。
      resultNums = nums.filter(function(value){
         return count % value == 0;
      });
      // resultNumsに値があったら、その値をcountと合わせて出力、それ以外はcountのみ出力
      if(resultNums.length >= 1){      
         for(var i = 0, l = resultNums.length; i < l; i++){
            say = i ==  0 ?　" " + resultNums[0] + "!" : say + resultNums[i] + "!";
         }
         console.log(count + say);
      }else{
         console.log(count);
      }
   }

   //開始、終了時間求める関数
   function dates(text){
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() -1 ;
      var d = date.getDay();
      var h = date.getHours();
      var mi = date.getMinutes();
      var s = date.getSeconds();
      var ms = date.getMilliseconds();
      var slash = "/";
      var time = y + slash + m + slash + d + " " + h + ":" + mi +":" + s + "." + ms;
      // 時間を表示
      console.log(text +  time); 
   }
})();