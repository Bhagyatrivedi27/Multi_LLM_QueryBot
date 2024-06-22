# React + vite - Signify AI


## How to get the app code? 

1. git clone url - repository
2. cd signify
3. cd ll-chat-client
4. npm install 
5. npm run dev

## Features
1. Google OAuth Authentication - Login system
2. ChatPage 
    - Select a model to query
    - Select a conversation or start a new conversation.
    - Write your query question to the server
    - Customize the Navbar logo, by cicking on the logo link on navbar
3. Logout


## To Deploy (Ubuntu EC2 instance)

1. Clone the repository of the llm-chat-client
2. Cd llm-chat-client
3. npm install (dependencies)
4. Make sure, .env file has GOOGLE_CLIENT_ID and BACKEND_URL 
5. Run npm build - to get dist.
6. Run - npm i nginx, pm2
7. configure nginx - 
    - home =  dist folder location. eg /home/ubuntu/signify/llm/chat/client
    - Directory = src folder
8. npm run dev



