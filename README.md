Chat Application – Backend\

 ➤ Overview\
This backend powers a ChatGPT-like conversational application built without external AI APIs.\
It provides secure authentication, conversation persistence, and custom chat response logic using RESTful APIs.\
The backend ensures:\
User-based conversation isolation\
Persistent chat history across sessions\
Clean, scalable API design

 ➤ Technology Stack\
Runtime: Node.js\
Framework: Express.js\
Database: PostgreSQL (Neon)\
Authentication: JWT (JSON Web Tokens)\
ORM/DB Client: pg\
Deployment: Render 


 ➤ Chat Logic\
Custom keyword-based response logic\
No external AI or LLM APIs used\
Deterministic responses for demo and assessment purposes\
Example handled keywords:\
help\
stack\
login\
new chat


 ➤ Database Schema \
 1)Users\
id\
username\
email\
password\
created_at

2)Conversations\
id\
user_id\
created_at

3)Messages\
id\
conversation_id\
sender (user/bot)\
message\
created_at

 ➤ Setup Instructions (Local)\
git clone <repository-url>\
cd backend\
npm install\
npm start

 ➤
| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | `/auth/signup` | Register new user |
| POST   | `/auth/login`  | Login user        |\


| Method | Endpoint                 | Description                     |
| ------ | ------------------------ | ------------------------------- |
| POST   | `/chat/send`             | Send a message                  |
| GET    | `/chat/:id`              | Get messages for a conversation |
| GET    | `/chat/my-conversations` | Fetch user’s conversations      |


