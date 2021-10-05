// EXPRESS
const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
// EXPRESS MIDDLEWARE 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
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