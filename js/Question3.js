(function(){
     'use strict';
          var  form = document.count,
               submit = form.submit,
               saveDigit,
               newLine = "\n",
               exclamation = "!",
               startBracket = "[",
               endBracket = "桁じゃん]",
               arrow = "=>\t";

     //桁数を調べる関数
     function digits(count, showDigits){
               var digit = count,
                           digitText;
                    // showDigits = false;
               if (showDigits === "false"){
                    return;
               }
               digit = digit.toString().length;
               if(digit != saveDigit){
                    digitText = startBracket + digit + endBracket;
                    saveDigit = digit;
                    return digitText;
               }
    }

     //倍数を調べる関数
    function multiple(count, value){
          var showCount = count,
               resultValue = [];
          // 割り切れた時その数値を新しい配列resultNumsに入れる。
          resultValue = value.filter(function(value){
              return count % value == 0;
          });
          // resultNumsに値があったら、その値をcountと合わせて出力、それ以外はcountのみ出力
          if(resultValue.length >= 1){
               showCount += arrow;
               for(var i = 0, l = resultValue.length; i < l; i++){
                    showCount += resultValue[i] + exclamation;
               }
          }
     return showCount;
     }

     //フォームから値を取得
     function getFormValue(event){
          var size = parseInt(form.size.value,10),
          order = form.order,
          showDigits = form.showDigits.value,
          denominator = [];
          console.log(order);
          for(var i=0 ; i<form.denominator.length ; i++){
               if(form.denominator[i].checked) {
                    denominator.push(parseInt(form.denominator[i].value, 10));
           }
         }
         return {size:size,order:order,showDigits:showDigits,denominator:denominator};
     }

     //開始、終了時間求める関数
     function dates(){
          var date = new Date();
          var y = date.getFullYear();
          var m = date.getMonth() +1 ;
          var d = date.getDate();
          var h = date.getHours();
          var mi = date.getMinutes();
          var s = date.getSeconds();
          var ms = date.getMilliseconds();
          var slash = "/";
          var time = y + slash + m + slash + d + " " + h + ":" + mi +":" + s + "." + ms;
          return time;
     }


     //イベントリスナで実行される関数　実行結果の表示をする
     function showCounts (){
          console.time("処理時間");
          console.log(dates());

          event.preventDefault();
          var  showCount = "",
               minNum = 1,
               showDigit;
          var  nums = getFormValue();
          if(nums.order === "ascending"){
               for(var i = nums.size; i >= minNum; i--){
                    showDigit = digits(i,nums.showDigits);
                    showCount += showDigit ? showDigit + newLine : "";
                    showCount += multiple(i, nums.denominator) + newLine;
               }
          }else{
               for(var i = minNum; i <= nums.size; i++){
                    showDigit = digits(i,nums.showDigits);
                    showCount += showDigit ? showDigit + newLine : "";
                    showCount += multiple(i, nums.denominator) + newLine;
               }
          }
          console.log(showCount);

          console.log(dates());
          console.timeEnd("処理時間");
     }

     submit.addEventListener('click', showCounts,false);
})();

