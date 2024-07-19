//const fs = require('fs');

const fsPromises = require('fs').promises;
const { ClientRequest } = require('http');
const path = require('path')


const fileOps = async ()=>{
    try{
        const data = await fsPromises.readFile(path.join(__dirname,'files','start.txt'), 'utf-8')
        console.log(data)
        await fsPromises.unlink(path.join(__dirname,'files','start.txt'))


        await fsPromises.writeFile(path.join(__dirname,'files','promiseWrite.txt'),data)
        await fsPromises.appendFile(path.join(__dirname,'files','promiseWrite.txt'),'\n\n Nice to meet you')
        await fsPromises.rename(path.join(__dirname,'files','promiseWrite.txt'),path.join(__dirname,'files','promiseComplete.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname,'files','promiseComplete.txt'), 'utf-8')
        console.log(newData)
        

    }catch(err){
        console.error(err)
    }
}

fileOps();

// fs.readFile(path.join(__dirname,'files','start.txt'), 'utf-8',(err,data)=>{
//     if(err) throw err;
//     console.log(data)
// })


console.log("hello....")


//write the file

// fs.writeFile(path.join(__dirname,'files','reply.txt'),"nice to meet you",(err)=>{
//     if(err) throw err;
//     console.log("write complete")
// })

// fs.appendFile(path.join(__dirname,'files','reply.txt'),"testing test",(err)=>{
//     if(err) throw err;
//     console.log("append complete")

//     fs.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','newReply.txt'),(err)=>{
//         if(err) throw err;
//         console.log("rename complete")
//     })
// })

// //exit on uncaught errors
// process.on('uncaughtException',err=>{
//     console.error(`there was an uncaught error:${err}`)
//     process.exit(1)
// })


