import store from "@/store";

const findMessageToReply = (id) => {
 const chatHistory = store.getters.FILTERED_MESSAGES;
 const messageToReply = chatHistory.find(msg => msg.id == id);
 return messageToReply;
};

export default findMessageToReply;