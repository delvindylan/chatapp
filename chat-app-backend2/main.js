import express from 'express';
import session from 'express-session';

const app = express();
const port = 3000;
app.use(express.urlencoded({ "extended": true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.listen(port, () => {
    console.log('listening on port ' + port)
});