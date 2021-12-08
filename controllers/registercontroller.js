const user=require('../models/user')




exports.gotoregister=((req,res)=>{
    res.render('register',{verifuser:req.session.userId,msg:req.flash('error')[0]})
})

exports.adduser=((req,res)=>{
    user.adduser(req.body.username,req.body.email,req.body.password).then(()=>{
        res.redirect('/onlyadminloginonlyadmin')
    }).catch((err)=>{
        console.log(err)
        req.flash('error',err)
        res.redirect('/onlyadminregisteronlyadmin')
        
    })
})

exports.gotologin=((req,res)=>{
    res.render('login',{verifuser:req.session.userId,msg:req.flash('error')[0]})
})
exports.login=((req,res)=>{
    user.login(req.body.email,req.body.password).then((id)=>{
        req.session.userId=id
        res.redirect('/home')
    }).catch((err)=>{
        console.log(err)
        req.flash('error',err)
        res.redirect('/onlyadminloginonlyadmin')      
    })
})
exports.logout=((req,res)=>{
    req.session.destroy()
    res.redirect('/onlyadminloginonlyadmin')
})