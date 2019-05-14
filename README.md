# socket-chat-app
Chat app for multiple users chat.

Node.js with socket.io enables communication between clients on TCP protocol.
The app is running on port 8091.
Both client and server code is JS (enabled by mustache).

To run the application open terminal/cmd/powershell, and write in the current folder(socket-chat-app) "npm install socket.io express body-parser mustache --save" {--save is optional from NPM version 5.0.0, body-parser is part of express since 4.16.0}.  
Run the command, then run npm start. 
(if you are using nodemon globally, write in the CLI - nodemon server). 
Open localhost on port 8091 (localhost:8091) on the browser URI (URL).

The login page is design with Bootstrap and the chat page with Materialize.

