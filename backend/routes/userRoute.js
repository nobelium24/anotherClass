const express = require("express")
const { land, signUp, resetPassword, signIn, verifyToken, uploadPicture } = require("../controllers/userController")
const userRouter = express.Router()
const { userValidationSchema, signInValidationSchema } = require("../middleware/userValidator")
const { validate } = require("../middleware/validate")

userRouter.get("/", land)
userRouter.post("/signup", validate(userValidationSchema), signUp)
userRouter.post("/resetpassword", validate(signInValidationSchema),resetPassword)
userRouter.post('/signin', signIn)
userRouter.get("/verifytoken", verifyToken)
userRouter.post("/upload", uploadPicture)
module.exports = userRouter