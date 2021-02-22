const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');


const db = require("./models");
db.sequelize.sync();


app.use(cors())
app.use(express.json())

app.use(bodyParser.json());

const userRouter = require('./routes/user')

app.use('/users', userRouter)

app.listen(5000, () => console.log('server started'))
