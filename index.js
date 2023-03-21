const dotenv =  require("dotenv")
dotenv.config({ path: './config/.env' })
const fileUpload = require('express-fileupload');
const { sequelize } = require("sequelize")
const express = require("express")
const cookieparser  = require("cookie-parser")
const app = express()
const PORT = process.env.API_PORT


app.use(function (req, res, next) {
    let dominiosPermitidos = process.env.DOMINIOS
    if (dominiosPermitidos.includes(req.headers.origin)) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    res.setHeader('Access-Control-Allow-Credentials', true)

    next()
})

app.use(cookieparser())


app.use(express.urlencoded({
    extended: true
}))

app.use(fileUpload());
app.use(express.json())


app.use("/",(req,res,next)=>{
    res.send("Route main")
})

app.listen(PORT,(req,res,next)=>{
        console.log(`Server running on http://localhost:${PORT}/`);
}
)



// process.on('unhandledRejection', err => {
//     console.log(`Error: ${err.message}`)
//     console.log('Shutting down the server due to Unhandled promise rejection.')
//     server.close(() => {
//         process.exit(1)
//     })
// })
