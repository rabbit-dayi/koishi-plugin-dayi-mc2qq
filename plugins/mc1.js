//print("owo")
console.log("----------------");
console.log("Hello World");
console.log("ver Beta 0.0001")
console.log("----------------");

var bot1

groupid="233333333333"
filepath="Z:/1.12.2_RLCRAFT_1/RLcraft_server_2_b/logs/latest.log"
con_names=['a','b','c','d','gamemode']
con_without=['issued server command','moved','PetBlocks','logged','[Rcon]','to player']


function is_rubbish_log(text){
  for(var i=0;i<con_without.length;++i){
    if(text.toString().indexOf(con_without[i]) != -1){
      return 1;//辣鸡信息
    }
  }
  return 0;//非辣鸡信息
}


var lastlines=-1
var fs = require("fs")
fs.watchFile(filepath,{encoding:'binary'}, (event, filename) => { 
  const readLastLines = require('read-last-lines');
  readLastLines.read(filepath, 1,"buffer")
      .then((lines) => {
        //对GB2312解码
        var iconv = require("iconv-lite");
        var buf = Buffer.from(lines);
        lines = iconv.decode(buf, 'GB2312')
        console.log(lines)

        for(var i=0;i<con_names.length;++i){
          //console.log(con_names[i])
          if(((c_index=lines.toString().indexOf(con_names[i])) != -1)&& !is_rubbish_log(lines)){
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

