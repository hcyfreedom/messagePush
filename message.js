/**
 * Created by Acer on 2017/2/22.
 */
$(document).ready(initWebsocket());

$(".showPush").click(function () {
    $(".pushDemo").css("display","block");
});
$('.closeBtn').click(function () {
    $('.pushDemo').css("display","none");
});
function initWebsocket() {
    var count = 0;
    if (window.WebSocket) {
        //打开一个websocket
        var ws = new WebSocket("ws://www.yuesdu.com/message/messagePush");
        ws.onopen = function () {
            //websocket已经连接上，使用send发送数据
            ws.send("发送数据");
            console.log("发送数据");
        };
        ws.error = function () {
            console.log("连接发生错误");
        };

        ws.onmessage = function (message) {
            data = eval('(' + message.data + ')');
            var mes = data.data;

                if(count == 0) {
                    for (i = 0; i < mes.length; i++) {
                        var messs = JSON.stringify(mes[i]).replace(/\"/g,"'");
                        $(".push").prepend('<div onclick='+'"readAlready('+messs+')"'+' >'+mes[i].message_content +'</div><br>');
                        count++;
                    }

            return;
            }
            if (mes.length>0){
                $(".showPush").css("color", "red");
            }
            var id = mes.message_id;
            console.log(id);
            $(".showPush").css("color", "red");
            var messs = JSON.stringify(mes).replace(/\"/g,"'");
            $(".push").prepend('<div onclick='+'"readAlready('+messs+')"'+'>'+mes.message_content+'</div><br>');
        }
    }
}
function readAlready(mes) {
        var _data = mes;
    console.log(_data.message_content);
    var a = _data.message_content;
    $.ajax({
        type:"post",
        url:"/message/delete",
        data:{massage_id:mes.message_id},
        dataType:'json',
        success:function (data) {
            console.log(_data.message_type);
            if ((_data.message_type == 0)||(_data.message_type == 3)){//匿名贴
                window.location.href="http://www.yuesdu.com/post_detail.html?"+_data.message_content.split("#")[1]+'#'+'0';
            }else if ((_data.message_type == 1)||(_data.message_type == 4 )){//表白贴
                window.location.href="http://www.yuesdu.com/post_detail.html?"+_data.message_content.split("#")[1]+'#'+'1';
            }else if(_data.message_type == 2){//心愿墙
                window.location.href="http://www.yuesdu.com/micro-wish/";
            }else if ((_data.message_type == 5)||(_data.message_type == 6)){//官方微博
                alert("请查看官方微博~")
            }

        }
    })
}