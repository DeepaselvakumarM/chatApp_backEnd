
// helps to customize and generate response according to the keywords mentioned here.
function generateBotReply(message) {
  const text = message.toLowerCase();

  if (text.includes("hello") || text.includes("hi")) {
    return "Hello! How can I help you today?";
  }

  if (text.includes("help")) {
    return "This is a demo chat app with persistence and authentication.";
  }
if (text.includes("stack") || text.includes("tech")) {
    return "Tech stack: Frontend → React + Bootstrap, Backend → Node.js + Express, Database → PostgreSQL (Neon), Authentication → JWT.";
  }

  if (text.includes("login")) {
    return "You can login using your registered email and password. If you don’t have an account, go to Signup.";
  }

  if (text.includes("new chat")) {
    return "Click on 'New Chat' to start a fresh conversation. Your previous chats are saved and can be viewed anytime.";
  }
  if (text.includes("time")) {
    return `Current time: ${new Date().toLocaleTimeString()}`;
  }

  if (text.includes("date")) {
    return `Today's date: ${new Date().toDateString()}`;
  }

  return "I am a demo bot. I can respond to keywords like help, stack, login, or new chat.";
}

module.exports = { generateBotReply };
