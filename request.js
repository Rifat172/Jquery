function send(expr=""){

    let tempexpr = document.getElementsByName("expression")[0].value;
    if(tempexpr!==""){
        expr = tempexpr;
    }

     $.ajax({
         type: "POST",
         dataType: "json",
         url: "server.php",
         data: "expression="+expr,
         success: function(response) {
            console.log(response);
            $("#result_form").html("");
            for(let history of response){
                //выводит историю на экран
                $("#result_form").append("Выражение: "+history.expression + " Результат: "+(history.success==0? "false":"true") + "<br/>");
            }
         }
     });
     return false;//false что бы страница не перезагружалась, true что бы перезагружалась
 }

 /**
  * функция выполняется при полной загрузки страницы. Выполняет запрос на сервер, если в ссылке указано выражение
  */
 function load(){
    let expr = $_GET("expression");
    if(expr){
        send(expr);
    }
 }

 /**
  * Находит в ссылке значение с нужным параметром 
  * @param {string} key 
  * @returns string or bool 
  */
 function $_GET(key) {
    var p = window.location.href;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}