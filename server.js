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

db.query(`Select * FROM candidates`, (err, rows) => {
    // console.table(rows)
})

db.query(`Select * from candidates WHERE id = 1`, (err, row) => {
    if (err) {
        console.log(err)
    }
    // console.log(row)
})

db.query(`Delete FROM candidates WHERE id = ?`, 1, (err, result) => {
    if (err) {
        console.log(err)
    }
    // console.log(result)
})

const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
             VALUES (?,?,?,?)`
const param = [1, 'Ronald', 'Firebank', 1] 

db.query(sql, param, (err, result) => {
    if (err) {
        console.log(err)
    }
    console.log(result)
})

app.use((req, res) => {
    res.status(400).end()
})

// LISTEN 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})