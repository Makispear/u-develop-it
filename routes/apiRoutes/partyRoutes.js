const express = require('express')
const router = express.Router()
const db = require('../../db/connection');

// Get all parties 
router.get('/parties', (req, res) => {
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

// Get single party
router.get('/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`
    const params = [req.params.id]
    db.query(sql, params, (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        return res.json({
          message: 'success',
          data: rows
        })
      })
});
  
  // Delete a specific party 
router.delete('/party/:id', (req, res) => {
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
  

module.exports = router