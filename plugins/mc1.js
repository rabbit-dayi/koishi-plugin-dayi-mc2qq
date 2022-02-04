//print("owo")
console.log("----------------");
console.log("Hello World");
console.log("ver Beta 0.00021")
console.log("----------------");

var bot1

plugins_path='./plugins/dayi-mc2qq/'

groupid="233333333"//群号
filepath="Z:/1.12.2_RLCRAFT_1/RLcraft_server_2_b/logs/latest.log"
var con_names=[]
var con_without=[]

//reading config file
const fs_readconfig = require('fs')
function motify_arr(arr1){
  for(var i=0;i<arr1.length;++i){
    arr1[i]=arr1[i].replace(/[\r\n]/g,"")
    if((arr1[i][0]==":"&&arr1[i][1]==":")||arr1[i]==""){
      arr1.splice(i, 1)
    }
  }
  return arr1
}

fs_readconfig.readFile(plugins_path+'/config/con_without.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error('[dayi-mc2qq]Reading config err!')
    console.error(err)
    return
  }
  con_without=data.toString().split("\n")
  con_without=motify_arr(con_without)
  //console.log(con_without)
})
const fs_readconfig2 = require('fs')
fs_readconfig2.readFile(plugins_path+'/config/con_names.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error('[dayi-mc2qq]Reading config err!')
    console.error(err)
    return
  }
  con_names=data.toString().split("\n")
  con_names=motify_arr(con_names)
  //console.log(con_names)
})


function is_rubbish_log(text){
  for(var i=0;i<con_without.length;++i){
    if(text.toString().indexOf(con_without[i]) != -1){
      //console.log("find rubbish:",con_without[i],text)
      return 1;//辣鸡信息
    }
  }
  return 0;//非辣鸡信息
}


var lastlines=-1
var fs = require("fs")
fs.watchFile(filepath,{interval: 500,encoding:'binary'}, (event, filename) => { 
  const readLastLines = require('read-last-lines');
  readLastLines.read(filepath, 1,"buffer")
      .then((lines) => {
        //对GB2312解码
        //我恨死锟斤拷了！
        var iconv = require("iconv-lite");
        var buf = Buffer.from(lines);
        lines = iconv.decode(buf, 'GB2312')
        console.log(lines)

        for(var i=0;i<con_names.length;++i){
          //console.log(con_names[i])
          //console.log("debug:",con_names[i],lines.toString().indexOf(con_names[i]),"isrubbish",is_rubbish_log(lines))

          if(((c_index=lines.toString().indexOf(con_names[i])) != -1)&& !is_rubbish_log(lines)){
            console.log("匹配成功！",con_names[i],lines)
            file_con=lines
            content="[MC]"+file_con.substr(c_index+con_names[i].length,lines.length-1)
            content=content.replace(/[\r\n]/g,"")
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
    //console.log(con_without)
    //console.log(con_names)
    return next()
  })

  ctx.on('attach-user',(session)=>{
    //console.log(session)
  })

}

