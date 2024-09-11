const express = require("express")
const morgan = require("morgan")

const app = express()
const cors = require("cors")
const ApiError = require("./utils/ApiErrors")
const ErrorHandling = require("./middlewares/ErrorHandler")
app.use(cors())
app.use(morgan("dev"))
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({extended:false}))

app.use("/api/v1", require("./routes"))

app.use("*",(req,res)=>{

    throw new ApiError(404,"Page not found")
}
)

app.use(ErrorHandling)


module.exports = app