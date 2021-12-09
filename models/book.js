const mongoose=require('mongoose')


var schemabook=mongoose.Schema({
    _id:mongoose.ObjectId,
    title:String,
    description:String,
    price:String,
    image:String,
    userid:mongoose.ObjectId
})

var book=mongoose.model('book',schemabook)
var url='mongodb+srv://whitebook:whitebook@cluster0.aja1x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
exports.getallbooks=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return book.find({})
        }).then(books=>{
            mongoose.disconnect()
            resolve(books)
        }).catch(err=>reject(err))
    })
}


exports.getonebook=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            return await book.findOne({_id:id})
            
        }).then(onebook=>{
            mongoose.disconnect()
            resolve(onebook)
        }).catch(err=>reject(err))
    })
        
}

exports.addbook=(title,description,price,image,userid)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            return await book.insertMany({
                title:title,
                description:description,
                price:price,
                image:image,
                userid:userid
            }).then(()=>{
                mongoose.disconnect()
                resolve('Book added!!')
            }).catch(err=>{console.log(err)})
        }).catch((err)=>{
            reject(err)
        })
    })
}
exports.getmybook=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return book.find({userid:id})
        }).then((book)=>{
            mongoose.disconnect()
            resolve(book)
        }).catch(err=>{
            console.log(err)
            reject(err)
        })
    
    }).catch((err)=>{
        mongoose.disconnect()
        console.log(err)
        
    })
}

exports.deletebook=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            return await book.deleteOne({_id:id})
            
        }).then(()=>{
            mongoose.disconnect()
            resolve('Book deleted')
        }).catch(err=>reject(err))
    })
}

exports.getupdatebook=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            return await book.findOne({_id:id})
        }).then((book)=>{
            mongoose.disconnect()
            resolve(book)
        }).catch(err=>{
            console.log(err)
            reject(err)
        })
    
    }).catch((err)=>{
        mongoose.disconnect()
        console.log(err)
        reject(err)
    })
}

exports.updatebook=(bookid,title,description,price,image)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            return await book.updateOne({_id:bookid},{
                title:title,
                description:description,
                price:price,
                image:image

            })
        }).then(()=>{
            mongoose.disconnect()
            console.log('updated')
            resolve('updated')

        }).catch((err)=>{
            reject(err)
        })
    })

}

