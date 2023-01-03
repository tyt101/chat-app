const { register, login, setAvatar, getAllUsers, logout} = require('../controllers/userControllers')

const router = require('express').Router()

router.post("/register", register)
router.post("/login", login)
router.post("/setAvatar/:id", setAvatar)
router.get("/getAllUsers/:id", getAllUsers)
router.get("/logout/:id", logout)
module.exports = router