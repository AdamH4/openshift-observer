const express = require('express')
// const cron = require('node-cron')
const app = express()
// const axios = require('axios')
const DB = require('./database/queries')
const knex = require('./database/config')
const response = require('./example-response.json')
const { parseAndStoreEntityFromJson, getBuildOpenApiSpecification } = require("./helpers")
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

// initialize cron job on each 30min
// const refreshingPodsTask = cron.schedule("*/30 * * * *", async () => {
//     try {
//         const freshPods = await getFreshPods()
//         savePods(freshPods)
//         console.log("---Cron successfuly done---")
//     } catch (err) {
//         console.error(err)
//     }
// }, { scheduled: false })

/*
 * @api [get] /
 * description: Greeting from server
 * responses:
 *   200:
 *     description: Greeting message.
 */
app.get('/', function (req, res) {
    res.send("Ahoj")
    // res.sendFile(__dirname + '/public/index.html');
})

// app.get('/migrate', () => {
//     knex.migrate
//         .latest()
//         .then(res => {
//             console.log(res)
//         })
// })

// app.post('/pod/insert', async (req, res) => {
//     await DB.insertPod({
//         name: req.body.name,
//         oas: JSON.stringify(req.body.oas)
//     })
//     res.json(req.body)
// })

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
    watch.watch('/api/v1/namespaces/monitoring-cluster/pods', { allowWatchBookmarks: true },
        (type, apiObj, watchObj) => {
            if (type === 'ADDED') {
                console.log('new object: ' + apiObj.metadata.name)
                parseAndStoreEntityFromJson(apiObj, OPERATIONS.INSERT)
            } else if (type === 'MODIFIED') {
                console.log('changed object: ' + apiObj.metadata.name)
                parseAndStoreEntityFromJson(apiObj, OPERATIONS.UPDATE)
            } else if (type === 'DELETED') {
                console.log('deleted object: ' + apiObj.metadata.name)
                parseAndStoreEntityFromJson(apiObj, OPERATIONS.DELETE)
            } else if (type === 'BOOKMARK') {
                console.log(`bookmark: ${watchObj.metadata.resourceVersion}`)
            } else {
                console.log('unknown type: ' + type)
            }
        },
        (err) => {
            console.log("DONE:", err)
        })
        .then((_) => {
            // watch returns a request object which you can use to abort the watch.
            // setTimeout(() => { req.abort(); }, 10 * 1000)
        })
}

const port = process.env.PORT || 8080

app.listen(port, async function () {
    // response.items.forEach(item => {
    //     parseAndStoreEntityFromJson(item, OPERATIONS.INSERT)
    // })
    // let retries = 5
    // while (retries) {
    //     try {
    //         await knex.migrate.latest()
    //         watchPods()
    //         break
    //     } catch (error) {
    //         retries--
    //         console.error(error)
    //         console.log(`Number of retries left: ${retries}`)
    //         await new Promise(res => setTimeout(res, 5000))
    //     }
    // }
})

