require('dotenv').config()

const express = require('express')
const exec = require('child_process').exec;

const app = express()

var port = parseInt(process.env.PORT) || 3000
var session_id = parseInt(process.env.SESSION_ID) || 2
var lock_command = process.env.LOCK_COMMAND || "loginctl lock-session"
var unlock_command = process.env.UNLOCK_COMMAND || "loginctl unlock-session"
var unique_code = process.env.UNIQUE_CODE || 1234

app.get('/', (req, res) => {
    res.status(200).send('Server is up and running!')
})

app.get('/unlock', (req, res) => {
    if (req.query.code !== unique_code) {
        res.status(403).json({
            status: "Invalid code"
        })
        return;
    }

    res.status(200).json({
        status: "Unlocked computer"
    })

    exec(`${unlock_command} ${session_id}`, function (error, stdout, stderr) {
        console.log(`Unlocking computer at ${Date.now()}`)

        if (error) {
            console.error(error)
        }

        if (stderr) {
            console.error(stderr)
        }
    });
})

app.get('/lock', (req, res) => {
    if (req.query.code !== unique_code) {
        res.status(403).json({
            status: "Invalid code"
        })
        return;
    }

    res.status(200).json({
        status: "Locked computer"
    })

    exec(`${lock_command} ${session_id}`, function (error, stdout, stderr) {
        console.log(`Locking computer at ${Date.now()}`)

        if (error) {
            console.error(error)
        }

        if (stderr) {
            console.error(stderr)
        }
    });
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})
