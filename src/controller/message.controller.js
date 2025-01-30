const Message = require('../models/message.model');

const getMessage = async (req, res) => {
    try {
       
        const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });



        return res.status(200).json({
            message: 'Success',
            data: messages
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}



const createMessage = async (req, res) => {
    try {
     
        const message = await Message.create({ senderId: req.user.id, content: req.body.content });

        return res.status(201).json({
            message: 'Success',
            data: message
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
module.exports = { getMessage, createMessage }