const express = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const auth = require('./middleWares/auth');
const httpInfo = require('./middleWares/InfoHttp');
const app = express();

app.use([httpInfo, express.json()]);

app.post('/user', UserController.create);
app.post('/user/log_in', SessionController.create);

app.use(auth);

app.get('/user', UserController.getInfo);

app.put('/user', UserController.update);

app.delete('/user/:deletUsr', UserController.deleteUser);

app.listen(5000, () => {
    console.log("Server listening on port 5000....");
});