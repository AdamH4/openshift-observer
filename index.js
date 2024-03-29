const express = require('express')
const app = express()
const DB = require('./database/queries')
const knex = require('./database/config')
// const response = require('./example-response.json')
const { parseAndStoreEntityFromJson } = require("./helpers")
const { OPERATIONS } = require("./database/databaseMapper")
const k8s = require('@kubernetes/client-node');
// const bodyParser = require('body-parser')
// app.use(bodyParser)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.json())
app.use(express.static('client/dist'))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

/*
 * @api [get] /
 * description: Greeting from server
 * responses:
 *   200:
 *     description: Greeting message.
 */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

/*
 * @api [get] /pods
 * description: Filter all env variables and return their OAS
 * responses:
 *   200:
 *     description: Return OAS of all pods.
 */
app.get('/pods', async (req, res) => {
    const pods = await DB.getAllPods()
    res.status(200).json(pods)
})

app.get("/socket", async (req, res) => {
    res.status(200).send("Socket under construction")
})

const watchPods = () => {
    const kc = new k8s.KubeConfig()
    kc.loadFromDefault()
    const watch = new k8s.Watch(kc)
    watch.watch('/api/v1/namespaces/monitoring-cluster/pods', {},
        async (type, apiObj, _) => {
            if (type === 'ADDED') {
                await parseAndStoreEntityFromJson(apiObj, OPERATIONS.INSERT)
            } else if (type === 'MODIFIED') {
                await parseAndStoreEntityFromJson(apiObj, OPERATIONS.UPDATE)
            } else if (type === 'DELETED') {
                await parseAndStoreEntityFromJson(apiObj, OPERATIONS.DELETE)
            } else {
                console.log('unknown type: ' + type)
            }
        },
        (err) => {
            console.log("DONE:", err)
        })
        .then((_) => {
            // setTimeout(() => { req.abort(); }, 1000)
        })
}

const port = process.env.PORT || 8080

app.listen(port, async function () {
    let retries = 5
    while (retries) {
        try {
            await knex.migrate.latest()
            watchPods()
            break
        } catch (error) {
            retries--
            console.error(error)
            console.log(`Number of retries left: ${retries}`)
            await new Promise(res => setTimeout(res, 5000))
        }
    }
})

