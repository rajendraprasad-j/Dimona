var express=require('express');
var app=express();

var port = process.env.PORT || 8085;

app.use(express.static(__dirname + '/build'));

app.listen(port,function(err){
  if(err){
      console.log(err);
  }else{
    console.log(`Server runing in port ${port}`);
  }
});