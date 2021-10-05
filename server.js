// EXPRESS
const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
// SQL 
const mysql = require('mysql2')
// EXPRESS MIDDLEWARE 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// CONNECT TO DATABASE
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maki@1951',
    database: 'election'
    },
    console.log('Connected to the sql database.')
)
// GET 
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

app.use((req, res) => {
    res.status(400).end()
})

// LISTEN 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})