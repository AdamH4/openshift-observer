const express = require('express')
const yaml = require('js-yaml')
const app = express()
const axios = require('axios')
const DB = require('./database/queries')
const knex = require('./database/config')
// const bodyParser = require('body-parser')
// app.use(bodyParser)
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

app.get('/db', async (req, res) => {
    const pods = await DB.getAllPods()
    res.json(pods)
})

app.get('/migrate', () => {
    knex
        .migrate
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
    const pods = await DB.getAllPods()
    res.json(pods)
    const freshPods = getFreshPods()
    console.log(freshPods)
})

function getFreshPods() {
    let envOfPods = filterPodEnvVariables()
    let oas = []
    let documents = []
    let podNames = []
    Object.keys(envOfPods).forEach(key => {
        const document = getOASFromPod(`${envOfPods[key].host}:${envOfPods[key].port}`)
        podNames.push(key)
        documents.push(document)
        oas.push({
            [key]: {
                port: envOfPods[key].port,
                host: envOfPods[key].host,
            }
        })
    })
    Promise.allSettled(documents).then(docs => {
        let index = 0
        for (let doc of docs) {
            if (doc.status === 'fulfilled') {
                oas[index][podNames[index]].specification = doc.value
            } else {
                oas[index][podNames[index]].specification = {}
            }
            index += 1
        }
        return JSON.parse(oas)
    })
}

async function getOASFromPod(url) {
    let response
    try {
        return await axios.get(`http://${url}/openapi.json`)
    } catch (err) {
        try {
            response = await axios.get(`http://${url}/openapi.yaml`)
        } catch (error) {
            return {}
        }
    }
    return yaml.safeLoad(response.data)
}

function filterPodEnvVariables() {
    let enviromentOpenshiftVariables = {}
    Object.keys(process.env).forEach(key => {
        const envKey = String(key)
        if (envKey.endsWith("SERVICE_PORT") && !(envKey.includes("KUBERNETES") || envKey.includes("OPENSHIFT_OBSERVER"))) {
            const keyIndex = envKey.indexOf("SERVICE_PORT")
            const key = envKey.slice(0, keyIndex - 1)
            if (enviromentOpenshiftVariables[key] === undefined) {
                enviromentOpenshiftVariables[key] = {}
            }
            enviromentOpenshiftVariables[key].port = process.env[envKey]
        } else if (envKey.endsWith("SERVICE_HOST") && !(envKey.includes("KUBERNETES") || envKey.includes("OPENSHIFT_OBSERVER"))) {
            const keyIndex = envKey.indexOf("SERVICE_HOST")
            const key = envKey.slice(0, keyIndex - 1)
            if (enviromentOpenshiftVariables[key] === undefined) {
                enviromentOpenshiftVariables[key] = {}
            }
            enviromentOpenshiftVariables[key].host = process.env[envKey]
        }
    })
    return enviromentOpenshiftVariables
}

const port = process.env.PORT || 8080

app.listen(port, function () {
    console.log("Example app listening at port " + port)
})

