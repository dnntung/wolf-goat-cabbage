let express = require('express')
let app = express()

app.get('/', (req, res) => {
     res.end("Hello World")
})

let port = process.env.PORT || 3000

app.listen(port, () => { 
     console.log("App running...")
})