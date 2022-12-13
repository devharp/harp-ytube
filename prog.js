require('dotenv').config();
const express = require('express'),
    cors = require('cors'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    fetch = require('node-fetch'),
    sqlite = require('sqlite3');

let db = null;
const app = express();
app.use(cors());
app.use(express.text());

// MIDDLEWARE
function authenticate(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if (token === null) return res.sendStatus(401)
        jwt.verify(token, process.env.SECRET_TOKEN, async(err, credentials) => {
            if (err) { return res.sendStatus(403) }
            const username = await findUsernamePassword({ username: credentials.username, password: credentials.password })
            if (username === credentials.username) {
                // console.log('reached hererererer: ', credentials.username === username);
                req.username = credentials.username;
                return next();
            }
        });
        // return res.sendStatus(501);
    } catch (err) {
        return res.sendStatus(501);
    }
}



app.get('/', authenticate, (req, res) => {
    res.sendStatus(200);
});

function addUser(payload) {
    return new Promise((resolve, reject) => {
        const uid = crypto.randomBytes(10).toString('hex').toUpperCase();
        db.exec(`INSERT INTO users(uid, username, password, email) VALUES('${uid}', '${payload.username}', '${payload.password}', '${payload.email}')`, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(true);
        });
    });
}

function findUsernamePassword(payload) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT username from users where username='${payload.username}' and password='${payload.password}'`, (err, rows) => {
            if (err) return reject(err);
            if (rows[0] !== undefined) {
                return resolve(rows[0].username);
            }
            reject(false);
        });
    });
}

app.post('/login', async(req, res) => {
    try {
        const payload = JSON.parse(req.body);
        // const payload = (req.body);
        // console.log(payload)
        switch (payload.type) {
            case 'login':
                console.log('requesting to login: ', { username: payload.username, password: payload.password })
                const dbusername = await findUsernamePassword(payload);
                if (dbusername === payload.username) {
                    const token = `Bearer ${jwt.sign({ username: payload.username, password: payload.password }, process.env.SECRET_TOKEN)}`;
                    console.log();
                    return res.send({ token });
                }
                break;
            case 'signup':
                const dbres = await addUser(payload);
                if (dbres) {
                    return res.sendStatus(200);
                }

                break;
            default:
                break;
        }
        return res.sendStatus(501);
    } catch (err) {
        console.error(err);
        return res.sendStatus(501);
    }
});

app.get('/auth', (req, res) => {
    try {
        const token = JSON.parse(req.body).token;
        res.sendStatus(501);
    } catch (err) {
        console.log(err)
        res.sendStatus(501);
    }
});

app.get('/search', async(req, res) => {
    try {
        if (req.query.query === undefined || req.query.query === null) {
            return res.sendStatus(501);
        }

        const secret_api = `https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&hl=en&gl=in&gs_rn=64&gs_ri=youtube&q=${req.query.query}`;

        const fres = await fetch(secret_api);
        const payload = await fres.text();

        const match = /(\[")(.*?)(")/gi.exec(payload);

        console.log(match);

        res.sendStatus(200);

    } catch (err) {
        return res.sendStatus(501);
    }
});


app.listen(process.env.HTTP_PORT, () => {
    db = new sqlite.Database('./db/database.db');
    console.log(`App running on port: ${process.env.HTTP_PORT}`);
});