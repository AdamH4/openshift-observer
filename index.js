const express = require('express')
const cron = require('node-cron')
const yaml = require('js-yaml')
const app = express()
const axios = require('axios')
const DB = require('./database/queries')
const knex = require('./database/config')
const response = require('./example-response.json')
const { parseAndStoreEntityFromJson } = require("./helpers")
const k8s = require('@kubernetes/client-node');
// const bodyParser = require('body-parser')
// app.use(bodyParser)

app.use(express.json())
app.use(express.static('client/dist'))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// initialize cron job on each 30min
const refreshingPodsTask = cron.schedule("*/30 * * * *", async () => {
    try {
        const freshPods = await getFreshPods()
        savePods(freshPods)
        console.log("---Cron successfuly done---")
    } catch (err) {
        console.error(err)
    }
}, { scheduled: false })

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

app.get('/db', async (req, res) => {
    const pods = await DB.getAllPods()
    res.json(pods)
})

app.get('/api', async (req, res) => {
    const data = parseAndStoreEntityFromJson(response.items[4])
    res.json(data)
})

app.get("/test/route", (req, res) => {
    res.json({
        message: "Succesfull test"
    })
})

app.get('/migrate', () => {
    knex.migrate
        .latest()
        .then(res => {
            console.log(res)
        })
})

app.post('/pod/insert', async (req, res) => {
    await DB.insertPod({
        name: req.body.name,
        oas: JSON.stringify(req.body.oas)
    })
    res.json(req.body)
})

/*
 * @api [get] /pods
 * description: Filter all env variables and return their OAS
 * responses:
 *   200:
 *     description: Return OAS of all pods.
 */
app.get('/pods', async (req, res) => {
    // const pods = await DB.getAllPods()
    // if (pods.length) res.json(pods)

    // const freshPods = await getFreshPods()
    // if (!pods.length) res.json(freshPods)
    // savePods(freshPods)
    // freshPods.forEach(async (pod) => {
    //     const podName = Object.keys(pod)[0]
    //     await DB.insertPod({
    //         name: podName,
    //         oas: JSON.stringify(pod[podName].specification),
    //         port: pod[podName].port,
    //         host: pod[podName].host,
    //     })
    // })
})

app.get("/socket", async (req, res) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault()
    const watch = new k8s.Watch(kc);
    watch.watch('/api/v1/namespaces/monitoring-cluster/pods',
        // optional query parameters can go here.
        {
            allowWatchBookmarks: true,
        },
        // callback is called for each received object.
        (type, apiObj, watchObj) => {
            if (type === 'ADDED') {
                console.log('new object:')
            } else if (type === 'MODIFIED') {
                console.log('changed object:')
            } else if (type === 'DELETED') {
                console.log('deleted object:')
            } else if (type === 'BOOKMARK') {
                console.log(`bookmark: ${watchObj.metadata.resourceVersion}`)
            } else {
                console.log('unknown type: ' + type)
            }
            console.log(apiObj.metadata.name)
        },
        // done callback is called if the watch terminates normally
        (err) => {
            console.log("DONE:", err)
        })
        .then((req) => {
            // watch returns a request object which you can use to abort the watch.
            setTimeout(() => { req.abort(); }, 10 * 1000)
        })
    res.status(200).send("NOICE")
})
// async function savePods(pods) {
//     pods.forEach(async (pod) => {
//         const podName = Object.keys(pod)[0]
//         await DB.insertPod({
//             name: podName,
//             oas: JSON.stringify(pod[podName].specification),
//             port: pod[podName].port,
//             host: pod[podName].host,
//         })
//     })
// }

// async function getFreshPods() {
//     let envOfPods = filterPodEnvVariables()
//     let oas = []
//     let documents = []
//     let podNames = []
//     Object.keys(envOfPods).forEach(key => {
//         const document = getOASFromPod(`${envOfPods[key].host}:${envOfPods[key].port}`)
//         podNames.push(key)
//         documents.push(document)
//         oas.push({
//             [key]: {
//                 port: envOfPods[key].port,
//                 host: envOfPods[key].host,
//             }
//         })
//     })
//     const docs = await Promise.allSettled(documents)
//     let index = 0
//     for (let doc of docs) {
//         if (doc.status === 'fulfilled') {
//             oas[index][podNames[index]].specification = doc.value
//         } else {
//             oas[index][podNames[index]].specification = {}
//         }
//         index += 1
//     }
//     return oas
// }

// async function getOASFromPod(url) {
//     let response
//     try {
//         return await axios.get(`http://${url}/openapi.json`)
//     } catch (err) {
//         try {
//             response = await axios.get(`http://${url}/openapi.yaml`)
//         } catch (error) {
//             return {}
//         }
//     }
//     return yaml.safeLoad(response.data)
// }

// function filterPodEnvVariables() {
//     let enviromentOpenshiftVariables = {}
//     Object.keys(process.env).forEach(key => {
//         const envKey = String(key)
//         if (envKey.endsWith("SERVICE_PORT") && !(envKey.includes("KUBERNETES") || envKey.includes("OPENSHIFT_OBSERVER"))) {
//             const keyIndex = envKey.indexOf("SERVICE_PORT")
//             const key = envKey.slice(0, keyIndex - 1)
//             if (enviromentOpenshiftVariables[key] === undefined) {
//                 enviromentOpenshiftVariables[key] = {}
//             }
//             enviromentOpenshiftVariables[key].port = process.env[envKey]
//         } else if (envKey.endsWith("SERVICE_HOST") && !(envKey.includes("KUBERNETES") || envKey.includes("OPENSHIFT_OBSERVER"))) {
//             const keyIndex = envKey.indexOf("SERVICE_HOST")
//             const key = envKey.slice(0, keyIndex - 1)
//             if (enviromentOpenshiftVariables[key] === undefined) {
//                 enviromentOpenshiftVariables[key] = {}
//             }
//             enviromentOpenshiftVariables[key].host = process.env[envKey]
//         }
//     })
//     return enviromentOpenshiftVariables
// }

const port = process.env.PORT || 8080

app.listen(port, async function () {
    // let retries = 5
    // while (retries) {
    //     try {
    //         await knex.migrate.latest()
    //         await knex.seed.run()
    //         refreshingPodsTask.start();
    //         break
    //     } catch (error) {
    //         retries--
    //         console.log(`Number of retries left: ${retries}`)
    //         await new Promise(res => setTimeout(res, 5000))
    //     }
    // }
})

