const { Router } = require("express")
const express = require("express")
const router = express.Router()
const admin = require("../../models/user/admins")

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')


//const Joi = require("joi")

app.use(express.urlencoded({ extended: false }))

app.use(flash())

/*app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))*/

app.use(passport.initialize())
//app.use(passport.session())

app.use(methodOverride('_method'))

/*app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.js', { name: req.user.name })
})*/
//houni besh nshoufou ken howa nafssou eli dkhal walé marbout bel front


//khdem
router.get("/",checkNotAuthenticated ,(req, res) => {
    const wc = "the server is on, you're connected"
    res.send(JSON.stringify(wc)),
    
    res.render('login.js')
      
})

//khdem
router.get("/admin", (req, res) => {

    admin.find()
        .then((result) => {
            res.send(JSON.stringify(result));
        }).catch((err) => {
            (
                console.log((err), "mataadesh.."))
        })

})

//khdem
router.post("/admin", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let Admin = new admin({

            user_name: req.body.user_name,
            password: hashedPassword,
            role: req.body.role

        })
        res.status(201).send()


        Admin.save()
            .then(result => res.send(JSON.stringify(result))
                .catch((err) => {
                    console.log((err), "error while saving the new admin..")

                }))
    }
    catch {
        res.status(500).send()
    }
})
/*
    router.delete("/user/:id", (req, res) => {
        const user_id = req.params.id
        Users.findById(user_id).then((userToDelete) => {
            userToDelete.delete()
            res.send(JSON.stringify(result))
        }).catch(err => {
            console.log(err)
        })

    })
    */
//makhdemesh edheya l code l but mte3ou ythabet est ce que shih walé yaani ylawej bel name w y9aren l mdp ken l9ah yodkhel ken mal9ahesh mayodkhelesh
/*router.post('/admin/login', async (req, res) => {

    let Admin = new admin({

        user_name: req.body.user_name,
        password: hashedPassword,
        role: req.body.role
    })
    Admin.find(Admin.user_name === req.body.user_name)
    if (Admin == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, Admin.password)){
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
})
*/

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    user_name => admin.find(admin => admin.user_name === user_name),
    id => admin.find(admin => admin.id === id)
)


  
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',//normalement ken jawha behy thezni lel home
    failureRedirect: '/login',//sinn besh to93ed fel page taa login
    failureFlash: true
  }))


//edheya besh taamel logout w tfasekhli ldonnée
  router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
 function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }




module.exports = router