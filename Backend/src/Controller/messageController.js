import cloudnary from "../Config/cloudnary.js";
import { getReceiverSocketId, io } from "../Config/socket.js";
import Message from "../Model/message.model.js";
import User from "../Model/user.model.js";

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedUser = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedUser } }).select("-password");

        res.status(200).json(filteredUser)
    } catch (error) {
        console.log("Error in getUsersForSidebar, controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find(
            { $or:[
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ]}
        );

        res.status(200).json(messages);
        
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const sendMessages = async(req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            //upload base64 image to cloudnary
            const uploadResponse = await cloudnary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessages controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export default {
    getUsersForSidebar,
    getMessages,
    sendMessages
}