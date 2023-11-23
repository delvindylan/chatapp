const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');


const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chat-app-80958-default-rtdb.europe-west1.firebasedatabase.app"
});

const app = express();
const server = http.createServer(app);
const cors = require('cors');
app.use(cors());

const messages = [];

app.use(bodyParser.json());

const getData = async (path) => {
  try {
    const db = admin.database();
    const messagesRef = db.ref(path);

    const snapshot = await messagesRef.once('value');
    const messagesData = snapshot.val();

    const messagesArray = messagesData ? Object.values(messagesData) : [];
    return messagesArray;
  } catch (error) {
    console.error('Error retrieving messages:', error);
    throw error;
  }
};

app.post('/api/messages', async (req, res) => {
  const { text, user, recipient } = req.body;

  const newMessage = {
    text,
    user,
    recipient,
    timestamp: new Date().toISOString(),
  };

  try {
    const db = admin.database();
    const messagesRef = db.ref('messages');

    const newMessageRef = await messagesRef.push(newMessage);

    console.log(`New Message: ${text} (User: ${user})`);

    const messagesArray = await getMessages();

    res.status(201).json({ message: `${text}`, messageId: newMessageRef.key, messages: messagesArray });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'An error occurred while creating the message' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const messagesArray = await getData('messages');
    res.json(messagesArray);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'An error occurred while retrieving messages' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const usersArray = await getData('users');
    res.json(usersArray);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'An error occurred while retrieving messages' });
  }
});

app.post('/api/users', async (req, res) => {
  const { name } = req.body;

  
  try {
    const db = admin.database();
    const usersRef = db.ref('users');
    
    const newUserRef = push(userRef);
    const userID = newUserRef.key;
    
    const newUser = {
      name,
      userID,
    };

    set(newUserRef, newUser);

    console.log(`New User: ${name} (ID: ${id})`);

    const usersArray = await getUsers();

    res.status(201).json({ user: newUser, userId: newUserRef.key, users: usersArray });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});


const PORT = process.env.PORT || 3001;




server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});