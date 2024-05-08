const http = require('http');
const headers = require('./headers');
const handleSuccess = require('./handleSuccess');
const handleError = require('./handleError')
const Post = require('./models/postsModel');

require('./connections/posts')

const requestListener = async(req, res)=>{
  let body = "";
  req.on('data', chunk=>{
      body+=chunk;
  })
  if(req.url=="/posts" && req.method == "GET"){
    const post = await Post.find();
    handleSuccess(res, post);
  }else if(req.url=="/posts" && req.method == "POST"){
    req.on('end',async()=>{
    try{
      const data = JSON.parse(body);
      const newPost = await Post.create(data);
      handleSuccess(res, newPost);
     }catch(error){
      handleError(res, error);
    }
  })
  }else if(req.url=='/posts' && req.method=="DELETE"){
    const posts = await Post.deleteMany({})
    handleSuccess(res, posts)
  }else if(req.url.startsWith("/posts/") && req.method=="DELETE"){
    const id = req.url.split('/').pop();
    const posts = await Post.findByIdAndDelete(id);
    handleSuccess(res, posts)
  }else if(req.url.startsWith("/posts/") && req.method=="PATCH"){
    req.on("end", async () => {
      try {
        let data = JSON.parse(body);
        let id = req.url.split("/").pop();
        const updataPost = await Post.findByIdAndUpdate(id, data);
        handleSuccess(res, updataPost);
      } catch (error) {
        handleError(res, error);
      }
    });
  }
  else if(req.method == "OPTIONS"){
      res.writeHead(200,headers);
      res.end();
  }else{
      res.writeHead(404,headers);
      res.write(JSON.stringify({
          "status": "false",
          "message": "無此網站路由"
      }));
      res.end();
  }
}
const server = http.createServer(requestListener);
server.listen(process.env.PORT);