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
const lunch = require('./model/lunchSchema')
const dinner = require('./model/DinnerSchema')

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
foodie.get('/createLunch', (req,res)=> {
    res.render('lunch.ejs', {message:req.flash('info')})
}) 
foodie.get('/createDinner', (req,res)=> {
    res.render('dinner.ejs', {message:req.flash('info')})
}) 
foodie.get('/login', (req,res)=> {
    res.render('login.ejs', {message:req.flash('info')})
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
    const breakfastMenu = new breakfast ({
        breakfastName: breakfastName,
        breakfastImage: breakfastImage,
        breakfastPrice: breakfastPrice,
        breakfastDescription: breakfastDescription
    }) 
    await breakfastMenu.save() 
    res.redirect('/createBreakfast')
    }catch(error){
        console.log('there seems to be  an error')
    }
})
foodie.post('/lunch', async (req,res)=> {
    try{
        const {lunchName, lunchImage, lunchPrice, lunchDescription} = req.body
    console.log({lunchName, lunchPrice})
    const foundLunch = await lunch.findOne({lunchName:lunchName}) 
    if(foundLunch) { 
        req.flash('info', 'This Lunch is already available on the menu')
        res.redirect('/createLunch') 
        return
    } 
    const lunchMenu = new lunch ({
        lunchName: lunchName,
        lunchImage: lunchImage,
        lunchPrice: lunchPrice,
        lunchDescription: lunchDescription
    }) 
    await lunchMenu.save()  
    res.redirect('/createLunch')
    }catch(error){
        console.log('there seems to be an error')
    }
})

foodie.post('/dinner', async (req,res)=> {
    try{
        const {dinnerName, dinnerImage, dinnerPrice, dinnerDescription} = req.body
    console.log({dinnerName, dinnerPrice})
    const foundDinner = await dinner.findOne({dinnerName:dinnerName}) 
    if(foundDinner) { 
        req.flash('info', 'This Dinner is already available on the menu')
        res.redirect('/createDinner') 
        return
    } 
    const dinnerMenu = new dinner ({
        dinnerName: dinnerName,
        dinnerImage: dinnerImage,
        dinnerPrice: dinnerPrice,
        dinnerDescription: dinnerDescription
    }) 
    await dinnerMenu.save()  
    res.redirect('/createDinner')
    }catch(error){
        console.log('there seems to be an error')
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
        res.redirect('/login')
    } catch(error) {
        console.log('error')  
    }
})  

let foundUser

foodie.post('/login', async (req,res)=> {
    try{
        const{firstName, password} =req.body
        console.log({firstName, password}) 
        foundUser = await User.findOne({firstName:firstName})

        if(foundUser) {
            const users = await bcrypt.compare(password, foundUser.password)
            if(users) {
                res.redirect('/')
            }else {
                req.flash('info', 'incorrect username or password')
                res.redirect('/login')
            }
        }
    }catch(error){
        console.log('error')
    }
})

let allBreakfast
let allLunch
let allDinner

foodie.get('/Dashboard', async (req,res)=> {
    allBreakfast = await breakfast.find()
    allLunch = await lunch.find()
    allDinner = await dinner.find() 

    const allFoods = [allBreakfast, allLunch, allDinner]
    res.render('userDashboard.ejs', {allFoods})
})


const PORT = 1500
foodie.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`) 
}) 