const Message = require('../model/messageModel')

module.exports.addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body
    const data = await Message.create({
      message: {
        text: message
      },
      users: [from, to],
      sender: from
    })
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (error) {
    next(error)
  }
}

module.exports.getAllMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body
    const messages = await Message.find({
      users: {
        $all: [from, to]
      }
    }).sort({ updatedAt: 1 })
    const oldMessage = messages.map((message, index) => {
      return {
        self: message.sender.toString() === from,
        message: message.message.text
      }
    }) 
    res.json(oldMessage)
  } catch (error) {
    next(error)
  }
}