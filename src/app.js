const express =require('express')
const path=require("path")
const bodyParser=require("body-parser")
const compiler=require("compilex")
const app=express()
app.use(bodyParser())
var option={ stats:true }
compiler.init(option)
app.use(express.static("C:/Users/jssat/OneDrive/Desktop/kalviam/public"))
app.set("view engine","hbs")
app.set("views","C:/Users/jssat/OneDrive/Desktop/kalviam/views")
app.get("/",(req,res)=>{
     res.render("index")
})
app.post("/compilecode",(req,res)=>
{
    var code=req.body.code
    var input=req.body.input
    var inputRadio=req.body.inputRadio
    var lang=req.body.lang
    if(lang ==="C" || lang ==="C++")
    {
        if(inputRadio ==="true" )
        {
            var envData ={ OS:"windows",cmd:"g++",options:{timeout:10000}}
            compiler.compileCPPWithInput(envData,code,input,function(data){
                if(data.error)
                {
                    res.send("index",{output:"error"})
                }
                else{
                    res.render("index",{output:data.output})
                }
            })
        }
        else
        {
            var envData ={OS:"windows",cmd:"g++",options:{timeout:10000}}
            compiler.compileCPP(envData,code,function(data){
                if(data.error)
                {
                    res.send("index",{output:"error"})
                }
                else{
                    res.render("index",{output:data.output})
                }
            })
        }
    }


    if(lang ==="Python")
    {
        if(inputRadio ==="true" )
        {
            var envData ={ OS:"windows"}
            compiler.compilePythonWithInput(envData,code,input,function(data){
                if(data.error)
                {
                    res.send("index",{output:"error"})
                }
                else{
                    res.send("index",{output:data.output})
                }
            })
        }
        else
        {
            var envData ={OS:"windows"}
            compiler.compilePython(envData,code,function(data){
                if(data.error)
                {
                    res.render("index",{output:error})
                }
                else{
                    res.render("index",{output:data.output})
                }
            })
        }
    }
})

app.get("/fullstat",(req,res)=>
{
    compiler.fullStat((data)=>
    {
        res.send(data)
    })
})

app.listen(3000)
compiler.flush(()=>
{
    console.log("all temporary files flushed")
})