// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res, message) => {

     // create token
     const token = user.getJwtToken();
      
     //  options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    // save token in the cookie {key : 'token'  && value : value of token}

    return res.status(statusCode).cookie('token', token, options).json({
        message ,
        token,
        user
    })

}

module.exports = sendToken;