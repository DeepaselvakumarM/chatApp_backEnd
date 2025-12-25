const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { sendMessage, getConversation,getMyConversations } = require("../controllers/chatController");

// api calls
router.post("/send", auth, sendMessage);
router.get("/my-conversations", auth, getMyConversations);
router.get("/:id", auth, getConversation);



module.exports = router;
