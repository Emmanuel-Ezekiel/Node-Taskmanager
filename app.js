const express = require('express');
const app = express()
const tasks = require('./routes/task')
const connectDB = require('./DB/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes


app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3002


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, function (){
      console.log(`Server is listening on port ${port}...`, this.address().port, app.settings.env)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
