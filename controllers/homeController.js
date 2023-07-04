const router = require('express').Router();


router.get('/', (req,res)=>{
    console.log(req.user)
    res.render('home')
})


router.get('/aboutUs', (req,res)=>{
    res.render('home/aboutus');
})



module.exports = router;