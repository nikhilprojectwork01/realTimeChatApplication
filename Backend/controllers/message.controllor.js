import { Conversation } from "../model/conversation.model.js";
import { Message } from "../model/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const SendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const recieverId = req.params.id;
    const { message } = req.body;
if(!message){
  return res.status(400).json({
    message:"Enter Some Message",
    success:false
  })
}
    let gotconversatation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] }
    });
    if (!gotconversatation) {
      gotconversatation = await Conversation.create({
        participants: [senderId, recieverId]
      })
    };
    const newMessage = await Message.create({
      senderId,
      recieverId,
      message
    })
    if (newMessage) {
      gotconversatation.message.push(newMessage._id);
    };
  await gotconversatation.save();
  // socket id: 
  const reciersocketId = getReceiverSocketId(recieverId)
  
  if(reciersocketId){
    io.to(reciersocketId).emit("newmessage" , newMessage);
  }
  
    return res.status(200).json({
      message: "Message Sent Successfully",
      newMessage,
      success: true
    })
  } catch  (error) {
    console.log(error);
  }
}



//getting all message  


export const getMessage = async (req, res) => {
  try {
    const recieverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] }
    }).populate("message");
    return res.status(200).json({
      message: "Message Find Successfully",
      conversation,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}