const express= require('express') 
const path = require('path') 
const bcrypt = require('bcrypt') 
const session = require('express-session')
const flash = require('connect-flash')

const foodie = express() 

foodie.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true,
}))
foodie.use(flash());
  


const connectDB = require('./utilities/database')
const User = require('./model/userSchema') 
const breakfast = require('./model/breakfastSchema')

connectDB()  

foodie.use(express.json()) 
foodie.use(express.static('./')) 
foodie.use(express.urlencoded({extended:true}))  
  

foodie.set('view engine', 'ejs') 

foodie.set('views', path.join(__dirname, '/views')) 
foodie.use(express.static(path.join(__dirname, 'public')))

foodie.get('/', (req,res)=> {
    res.render('GetStarted.ejs', {message:req.flash('info')})
})  
foodie.get('/createBreakfast', (req,res)=>{
    res.render('breakfast.ejs', {message:req.flash('info')})
})
 

foodie.post('/breakfast', async (req,res)=> {
    try{
        const {breakfastName, breakfastImage, breakfastPrice, breakfastDescription} =req.body
    console.log({breakfastName, breakfastPrice})
    const foundBreakfast = await breakfast.findOne({breakfastName:breakfastName}) 
    if(foundBreakfast) {
        req.flash('info', 'This breakfast is already available on the menu')
        res.redirect('/createBreakfast') 
        return
    } 
    const breakfasts = new breakfast ({
        breakfastName: breakfastName,
        breakfastImage: breakfastImage,
        breakfastPrice: breakfastPrice,
        breakfastDescription: breakfastDescription
    }) 
    await breakfasts.save() 
    res.redirect('/CreateBreakfast')
    }catch(error){
        console.log('there is an error')
    }
})


foodie.post('/getStarted', async (req,res)=> {
    try{
        const{firstName, lastName, email, password} = req.body 
        console.log({firstName, lastName})
        const foundUser = await User.findOne({firstName:firstName})
        if(foundUser) {
            req.flash('info', 'User already exists')
            res.redirect('/')
        } 
        const userHashedPassword = await bcrypt.hash(password, 10)
        const Users = new User ({ 
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: userHashedPassword,
            role: 'user'
        }) 

        await Users.save() 
        res.redirect('/')
    } catch(error) {
        console.log('error')  
    }
})  


const PORT = 1500
foodie.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`)
}) 