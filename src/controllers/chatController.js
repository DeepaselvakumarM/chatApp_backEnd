const pool = require("../config/db");
const { generateBotReply } = require("../services/chatService");

// send messagewhen api calls
exports.sendMessage = async (req, res, next) => {
  try {
    const { conversationId, message } = req.body;
    const userId = req.user.id;

    if (!message) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    let convId = conversationId;

    if (!convId) {
      const conv = await pool.query(
        "INSERT INTO conversations(user_id) VALUES($1) RETURNING id",
        [userId]
      );
      convId = conv.rows[0].id;
    }

    await pool.query(
      "INSERT INTO messages(conversation_id,sender,message) VALUES($1,$2,$3)",
      [convId, "user", message]
    );

    const botReply = generateBotReply(message);

    await pool.query(
      "INSERT INTO messages(conversation_id,sender,message) VALUES($1,$2,$3)",
      [convId, "bot", botReply]
    );

    res.json({ conversationId: convId, reply: botReply });
  } catch (err) {
    next(err);
  }
};

// exports.getConversation = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const messages = await pool.query(
//       "SELECT sender,message,created_at FROM messages WHERE conversation_id=$1 ORDER BY created_at",
//       [id]
//     );

//     res.json(messages.rows);
//   } catch (err) {
//     next(err);
//   }
// };


// get message according to users
exports.getConversation = async (req, res, next) => {
  try {
    const { id } = req.params; // conversation ID from URL
    const userId = req.user.id; // logged-in user

    // Only fetch if conversation belongs to this user
    const result = await pool.query(
      `
      SELECT m.sender, m.message, m.created_at
      FROM messages m
      JOIN conversations c ON m.conversation_id = c.id
      WHERE m.conversation_id = $1 AND c.user_id = $2
      ORDER BY m.created_at
      `,
      [id, userId]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};


// Get all conversations for logged-in user
exports.getMyConversations = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch all conversations of the user along with last message
    const result = await pool.query(
      `
      SELECT c.id AS conversation_id,
             m.sender,
             m.message,
             m.created_at
      FROM conversations c
      LEFT JOIN LATERAL (
        SELECT * FROM messages
        WHERE conversation_id = c.id
        ORDER BY created_at DESC
        LIMIT 1
      ) m ON true
      WHERE c.user_id = $1
      ORDER BY c.id DESC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
