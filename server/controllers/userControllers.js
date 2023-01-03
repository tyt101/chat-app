
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
module.exports.register = async(req, res, next) => {
  try {
    const { email, username, password } = req.body
    const checkUsername = await User.findOne({ username })
    if (checkUsername) {
      return res.json({ msg: 'username already used', status: false })
    }
    const checkEmail = await User.findOne({ email })
    if (checkEmail) return res.json({ msg: 'email already used', status: false })
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      email,
      password:hashPassword
    })
    delete user.password
    return res.json({ status: true, user })
  } catch (error) {
    next(error)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.json({status: false, msg: 'incorrect username or password.'})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.json({status: false, msg: 'incorrect username or password.'})
    }
    return res.json({status: true, user})
  } catch (error) {
    next(error)
  }
}

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id
    const avatarImage = req.body.image
    const user = await User.findByIdAndUpdate(
      userId, {
        isAvatarImageSet: true,
        avatarImage
      }, {
        new: true
      }
    )
    return res.json({
      isSet: user.isAvatarImageSet,
      image: user.avatarImage,
    });
  } catch (error) {
     next(error)
  }
}

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id
    const users = await User.find({ _id: { $ne: userId } }).select([
      'username',
      'email',
      'avatarImage',
      '_id'
    ])
    return res.json(users);
  } catch (error) {
    next(error)
  }
}

module.exports.logout = async (req, res, next) => {
  try {
    const userId = req.params.id
    if (!userId) return res.json({ status: false, msg: 'user id is required' })
    
  } catch (error) {
    next(error)
  }
}