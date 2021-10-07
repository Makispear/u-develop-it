// EXPRESS
const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
// SQL 
const mysql = require('mysql2')
const inputCheck = require('./utils/inputCheck')
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

// Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
                 AS party_name 
                 FROM candidates 
                 LEFT JOIN parties 
                 ON candidates.party_id = parties.id`
    db.query(sql, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      return res.json({
        message: 'success',
        data: rows
      })
    })
})

// Get a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
                 AS party_name 
                 FROM candidates 
                 LEFT JOIN parties 
                 ON candidates.party_id = parties.id 
                 WHERE candidates.id = ?`
    const params = [req.params.id]
    db.query(sql, params, (err, row) => {
      if (err) {
        return res.status(400).json({ error: err.message })
      }
      return res.json({
        message: 'success',
        data: row
      })
    })
})

// Get all parties 
app.get('/api/parties', (req, res) => {
  const sql = `SELECT * FROM parties`
  db.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    return res.json({
      message: 'success',
      data: rows
    })
  })
})

// Delete a specific candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`
    const params = [req.params.id]
  
    db.query(sql, params, (err, result) => {
      if (err) {
        return res.statusMessage(400).json({ error: res.message })
      } else if (!result.affectedRows) {
        return res.json({
          message: 'Candidate not found'
        })
      } else {
        return res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        })
      }
    })
})

// Delete a specific party 
app.delete('/api/party/:id', (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`
  const params = [req.params.id]
  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(400).json({ error: res.message })
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      return res.json({
        message: 'Party not found'
      })
    } else {
      return res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      })
    }
  })
})

// Add a candidate 
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected')
    if (errors) {
      return res.status(400).json({ error: errors })
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                 VALUES (?,?,?)`
    const params = [body.first_name, body.last_name, body.industry_connected]
    db.query(sql, params, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err.message})
      }
      return res.json({
        message: 'Success',
        data: body
      })
    })
})

// Update a candidate's party
app.put('/api/candidate/:id', (req, res) => {
  const errors = inputCheck(req.body, 'party_id')
  if (errors) {
    return res.status(400).json({ error: errors})
  }
  const sql = `UPDATE candidates SET party_id = ? 
               WHERE id = ?`
  const params = [req.body.party_id, req.params.id]
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message })
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      })
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      })
    }
  })
})

db.query(`Select * FROM candidates`, (err, rows) => {
    // return console.table(rows)
})

db.query(`Select * from candidates WHERE id = 1`, (err, row) => {
    if (err) {
        return console.log(err)
    }
    // return console.log(row)
})

db.query(`Delete FROM candidates WHERE id = ?`, 1, (err, result) => {
    if (err) {
        console.log(err)
    }
    // return console.log(result)
})

const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
             VALUES (?,?,?,?)`
const param = [1, 'Ronald', 'Firebank', 1] 

db.query(sql, param, (err, result) => {
    if (err) {
        console.log(err)
    }
    // return console.log(result)
})

app.use((req, res) => {
    res.status(400).end()
})

// LISTEN 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})