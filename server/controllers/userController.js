const User = require('../models/userModels');

const bcrypt = require('bcrypt');

module.exports.register = async (req,res,next) => {
   try{
    console.log(req.body);

    const {userName,email,password} = req.body;
    const usernameCheck = await User.findOne({userName});
    if(usernameCheck) {
       return res.json({
            msg: "username already used",
            status: false
        })    
    }
    const emailCheck  = await User.findOne({email})
    if(emailCheck) {
        return res.json({
            msg: "email already used",
            status: false
        }) 
    }

    const  hashedPassword = await bcrypt.hash(password,10);

    const user = User.create({
        userName,
        email,
        password: hashedPassword
    })

    delete user.password
    return res.json({
        status: true,
        user
    })
} 
catch (ex) {
    next(ex)
}
   }


   module.exports.login = async (req,res,next) => {
    try {
        const {userName,password} = req.body;
        const user = await User.findOne({userName});
        const  hashedPassword = await bcrypt.hash(password,10);
        const passwordCheck = await User.findOne({hashedPassword})

    if(!user) {
        return res.json(
            {
                msg: "incorrect username or password",
                status: false
            }
            
        )
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid) {
        return res.json(
            {
                msg: "incorrect username or password",
                status:false
            }
            )
    }
    delete user.password
    return res.json({
        msg: 'giris basarili..',
        status: true,
        user
    })
    }
    catch (ex) {
        next(ex) 
    }
   }