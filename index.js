var express = require('express')
const yaml = require('js-yaml')
var app = express()
const axios = require('axios')
const e = require('express')

app.use(function(req, res, next) {
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
   res.json({"message" : "Hello GET / route"});
})


/*
 * @api [get] /pods
 * description: Filter all env variables and return their OAS
 * responses:
 *   200:
 *     description: Return OAS of all pods.
 */
app.get('/pods', (req,res) => {
    let envOfPods = filterPodEnvVariables()
    let oas = []
    Object.keys(envOfPods).forEach(async(key) => {
        let document
        try{
            document = await getOASFromPod(`${envOfPods[key].host}:${envOfPods[key].port}`)
        }catch(err){
            return
        }
        oas.push({
            oas: document,
            [key]: {
                port: envOfPods[key].port,
                host: envOfPods[key].host
            }
        })
        console.log(oas)
    })
    res.json(oas)
})

async function getOASFromPod(url){
    let response
    try{
        response = await axios.get(`http://${url}/openapi.yaml`)
    }catch(err){
        return err
    }
    return yaml.safeLoad(response.data)
}

function filterPodEnvVariables(){
    let enviromentOpenshiftVariables = {}
    Object.keys(process.env).forEach(key => {
        const envKey = String(key)
        if(envKey.endsWith("SERVICE_PORT") && !(envKey.includes("KUBERNETES") || envKey.includes("OPENSHIFT_OBSERVER"))){
            const keyIndex = envKey.indexOf("SERVICE_PORT")
            const key = envKey.slice(0,keyIndex - 1)
            if(enviromentOpenshiftVariables[key] === undefined){
                enviromentOpenshiftVariables[key] = {}
            }
            enviromentOpenshiftVariables[key].port = process.env[envKey]
        }else if(envKey.endsWith("SERVICE_HOST") && !(envKey.includes("KUBERNETES") || envKey.includes("OPENSHIFT_OBSERVER"))){
            const keyIndex = envKey.indexOf("SERVICE_HOST")
            const key = envKey.slice(0,keyIndex - 1)
            if(enviromentOpenshiftVariables[key] === undefined){
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

