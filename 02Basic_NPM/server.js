const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const {logger,logEvents} = require('./middleware/logEvents')
const PORT = process.env.PORT || 3500

//custom middleware
// app.use((req,res,next)=>{
//     logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
//     console.log(`${req.method} ${req.path}`)
//     next()
// })
//above code work same as logger
app.use(logger)


//cors origin resource sharing
const whitelist = ['https://www.google.com','http://127.0.0.1:500']
const corsOptions ={
    origin:(origin,callback)=>{
        if(whitelist.indexOf(origin)!==-1){
            callback(null,true)
        }else{
            callback(new Error('not allowed by Cors'))
        }
    },
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

//built in middle ware to handle urlencoded data
//in other words , form data
//'content-type : application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}))
//built-in middleware for json
app.use(express.json())
//serve static files
app.use(express.static(path.join(__dirname,'/public')))


app.get('^/$|index(.html)?',(req,res)=>{
    //res.sendFile('./views/index.html',{root : __dirname})
    res.sendFile(path.join(__dirname,'views','index.html'))

})
app.get('/new-page(.html)?',(req,res)=>{
    //res.sendFile('./views/index.html',{root : __dirname})
    res.sendFile(path.join(__dirname,'views','new-page.html'))

})
app.get('/old-page(.html)?',(req,res)=>{
    //res.sendFile('./views/index.html',{root : __dirname})
    res.redirect(302,'/new-page.html')//302 by default

})


//route handlers
// function chain
app.get('/hello(.html)?',(req,res,next)=>{
    console.log("attempted to load hello.html")
    next()
},(req,res)=>{
    res.send('hello world')
})


//chaining route handler

const one =(req,res,next)=>{
    
console.log("one")
next()
}

const two =(req,res,next)=>{
    
console.log("two")
next()
}

const three =(req,res,next)=>{
console.log("three")
res.send("finished")
}
app.get('/chain(.html)?',[one,two,three])

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'
    ))
})
app.listen(PORT,()=>console.log(`server running on ${PORT}`))