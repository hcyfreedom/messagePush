# messagePush
WebSocket推送消息<br>
        
        if(count == 0) {
                            for (i = 0; i < mes.length; i++) {
                                var messs = JSON.stringify(mes[i]).replace(/\"/g,"'");
                                $(".push").prepend('<div onclick='+'"readAlready('+messs+')"'+' >'+mes[i].message_content +'</div><br>');
                                count++;
                            }
      
这段代码将从后台取到积累消息，在连接建立的时候把所有后台积累的消息推送过来，相对于队列里的消息被推送到前端，然后按照想要的方式展示数据就行。<br>
        
        data = eval('(' + message.data + ')');
        
这句呢是由于从后台过来的原始消息的字符串类型的，要把它改成对象，然后取里面的内容。<br>
        
         var messs = JSON.stringify(mes).replace(/\"/g,"'");C
这句呢把json格式数据变成对象传进function readAlready()。<br>


易错点在于：1、点击查看之后，要把已查看消息删除。一开始做错的原因是函数执行顺序有问题。最初的想法是加个链接跳转到详情页，然后在点击链接的同时，ajax把所点击的消息的id传回后台。这样的做法会导致还没有来得及将数据返回后台，就跳转了，那么ajax相当于没有起作用。所以改进的方法就是，在readAlready()里面写ajax，同时解析数据，打开跳转页面。
<br>2、不要混淆了消息id和帖子id。消息id是后台直接给的，mess里面有。但是帖子id要从message_content里面提取出来。<br>
3、单词，不要拼错单词，不要忘记基础。