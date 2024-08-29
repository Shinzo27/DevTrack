import jwt from 'jsonwebtoken'

export function generateToken(user,message,statusCode,res) {
    const payload = {
        id: user._id,
        name: user.name,
        role: user.role,
        project: user.projects
    }
     const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES})

     const cookieName = "userToken"

     res.cookie(cookieName, token)
     res.status(statusCode).json({
        success: true,
        message,
        token,
        user: payload
     })
}

