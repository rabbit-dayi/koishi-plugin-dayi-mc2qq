//print("owo")
console.log("----------------");
console.log("Hello World");
console.log("----------------");

//yarn add read-last-lines
//yarn add iconv-lite


var bot1

groupid="22133123321" //qq群号
filepath="Z:/1.12.2_RLCRAFT_1/RLcraft_server_2_b/logs/latest.log" //log文件位置
con_names=['owo_owo','OUo','ovo','QAQ']  //这些字符串会被接受匹配，并且输出
con_without=['issued server command','moved too quickly']//包含这些字符串的将不会输出（可能

var fs = require("fs")
fs.watchFile(filepath, (event, filename) => { 


  const readLastLines = require('read-last-lines');
  readLastLines.read(filepath, 1)
      .then((lines) => {
        
        //反正，这么一大堆解码，失败了。
        //呜呜

        //对GB2312解码
        // var iconv = require('iconv-lite'); 
        // var BufferHelper = require('bufferhelper');
        // var bufferHelper = new BufferHelper();
        // bufferHelper.concat(lines);
        // lines=iconv.decode(bufferHelper.toBuffer(),'GBK')
        //const { encodeGBK, decodeGBK } = require('gbk-string');
        //lines=decodeGBK(lines)
        var iconv = require("iconv-lite");
        var chunks = [];

        var buf=Buffer.from(lines,'utf-8')
        chunks.push(buf);
        var lines = iconv.decode(Buffer.concat(chunks), 'GB2312').toString('binary')

        console.log(lines)


        for(var i=0;i<con_names.length;++i){
          //console.log(con_names[i])
          if(((c_index=lines.toString().indexOf(con_names[i])) != -1)&& lines.toString().indexOf(con_without[0]) == -1 && lines.toString().indexOf(con_without[1]) ==-1){
            console.log("匹配成功！",con_names[i],lines)
            file_con=lines
            content="[MC]"+file_con.substr(c_index,lines.length-1)
            id=bot1.sendMessage(groupid, content)
          }
        }
      });
  
  console.log("owo!")
  
});


module.exports = (ctx) => {
  ctx.middleware((session, next) => {
    bot1=session.bot
    return next()
  })
  
  ctx.middleware((session, next) => {
    bot1=session.bot
    return next()
  })

  ctx.on('attach-user',(session)=>{
    //console.log(session)
  })

}

