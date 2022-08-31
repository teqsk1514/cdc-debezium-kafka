const app = require('express')();

const mongodbConnection = require("./mongodb")
const generator  = require("./generator")

app.get('/', (req, res) =>
    res.json({ message: 'node app running' })
);

const port = process.env.PORT || 8080;
const mongoUrl = process.env.MONGO_URI || `mongodb://localhost:27017`
const mongoMsgFlushTime = process.env.MESSAGE_FLUSH_TIME_MS || 1000
const printMessage = process.env.PRINT_MESSAGE_BOOL || false
const dbName = process.env.DB_NAME || "main"
const collectionName = process.env.COLLECTION_NAME || "users"
const messageCount = process.env.MESSAGE_COUNT || -1

app.listen(port, async () => {
    console.log(`app listening on http://localhost:${port}`)

    try {
        const dbConnection = await mongodbConnection({ url: mongoUrl, dbName })
        console.log('dbConnection=', dbConnection)

        generator({ dbConnection, collectionName, flushTime: mongoMsgFlushTime, printMessage, messageCount }).catch((err) => {
            console.error("error in generator: ", err)
        })

    } catch (error) {
        console.error("error in mongodbConnection: ", error)
    }
});