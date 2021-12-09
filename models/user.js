const mongoose=require('mongoose')


var schemauser=mongoose.Schema({
    _id:mongoose.ObjectId,
    username:String,
    email:String,
    password:String
})

var user= mongoose.model('user',schemauser)
var url='mongodb+srv://whitebook:whitebook@cluster0.aja1x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

exports.adduser=(username,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return user.findOne({email:email})
        }).then((email)=>{
            if(email){
                mongoose.disconnect()
                reject('email exists')
                
            }
        }).then(()=>{
            return user.insertMany({
                username:username,
                email:email,
                password:password
            })
    }).then(()=>{
        mongoose.disconnect()
        resolve('user added')
    })
})
}

exports.login=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return user.findOne({email:email})
        }).then((user)=>{
            if(user){
                let test=user.password==password
                if(test){
                    console.log('login')
                    mongoose.disconnect()
                    resolve(user._id)
                }else{
                    mongoose.disconnect()
                    reject('wrong password!!')
                }
            }else{
                mongoose.disconnect()
                reject('user not exists!!')
            }
        }).catch((err)=>{
            console.log(err)
        })
    })
}