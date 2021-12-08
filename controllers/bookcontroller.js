//general home info 
const namestore='white book store'
const description='white book store is the digital store which sell programming books online. We are dedicated to creating “a world enlightened by reading” by selling the industry’s largest catalog of books..'
//


const bookmodel=require('../models/book')
exports.allbookcontroller=(req,res,next)=>{
    bookmodel.getallbooks().then(books=>{
        res.render('home',{books:books,verifuser:req.session.userId,msg:req.flash('msg')[0],namestore:namestore,desc:description})
    })
}

exports.onebookcontroller=(req,res,next)=>{
    bookmodel.getonebook(req.params.id).then(book=>{
        res.render('detail',{
            book:book,
            verifuser:req.session.userId

        })
    })
}


exports.getaddbook=(req,res,next)=>{
    res.render('addbook',{verifuser:req.session.userId})
}

exports.addbookcontroller=(req,res,next)=>{
    bookmodel.addbook(req.body.title,req.body.description,req.body.price,req.file.filename,req.session.userId).then((msg)=>{
        console.log(msg)
        req.flash('msg',msg)
        res.redirect('/home')
    })   
}

exports.getmybooks=(req,res,next)=>{
    bookmodel.getmybook(req.session.userId).then((books)=>{
        res.render('mybooks',{books:books,verifuser:req.session.userId})
    })
}
exports.deletebook=(req,res,next)=>{
    bookmodel.deletebook(req.params.id).then(()=>{
        res.redirect('/mybooks')
    }).catch(err=>{console.log(err)})
}

exports.getupdatebookpage=(req,res,next)=>{
    bookmodel.getupdatebook(req.params.id).then((book)=>{
        res.render('updatebookpage',{book:book,verifuser:req.session.userId})
    })
    
}
exports.updatebook=((req,res,next)=>{
   if(req.file){
    bookmodel.updatebook(req.body.bookid,req.body.title,req.body.description,req.body.price,req.file.filename).then(()=>{
        res.redirect('/mybooks')
        console.log('with image')
        console.log(req.body.bookid,req.body.title,req.body.description,req.body.price,req.file.filename)
    })
   }else{
    bookmodel.updatebook(req.body.bookid,req.body.title,req.body.description,req.body.price,req.body.oldimage).then(()=>{
        res.redirect('/mybooks')
        console.log('with noooo image')
    })

   }
})



//