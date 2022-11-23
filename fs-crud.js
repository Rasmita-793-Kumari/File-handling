const fs=require("fs");
const http=require("http");
const PORT=7744;
const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end("<h1>Assignments</h1>");
    }
    else if(req.url=="/createfile"){
        if(fs.existsSync("neosoft.html")){
            res.end("Already Exists");
        }
        else{
            fs.writeFile('neosoft.html',"<html><head><title>Assignments</title></head><body><h1>Hello World,How are doing?</h1></body></html>",(err)=>{
                if(err) throw err
                else res.end('File Created');
            })
        }
    }
    else if(req.url=="/readfile"){
        if(fs.existsSync("neosoft.html")){
            let data=fs.readFileSync("neosoft.html");
            res.end(data.toString());
        }
        else{
            res.end("File Is Not Exists");
        }

    }
 
    else if (req.url === "/appendfile") {
        if(fs.existsSync("neosoft.html")){
            fs.appendFile("neosoft.html", "And The File Is Updated...!!!", (err) => {
                if (err) throw err;
                else res.end("Data updated") 
            })
        }
        else{
            res.end("File is not Exists");
        }

    }    
    else if(req.url=="/deletefile"){
        if(fs.existsSync("neosoft.html")){
            fs.unlink("neosoft.html",(err)=>{
                if(err) throw err
                else res.end("File deleted")
            })
        }
        else{
            res.end("File is not Exists");
        }
    }
    else{
        res.end("Invalid URL")
        }
    })
    server.listen(PORT,()=>{
        console.log(`Server work on port ${PORT}`)
    })