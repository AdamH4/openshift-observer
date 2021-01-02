var express = require('express')
const yaml = require('js-yaml')
var app = express()
const axios = require('axios')
require('dotenv').config()

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
    res.json(filterPodEnvVariables())
})

function getOASFromPod(url){
    axios.get(`http://${url}/openapi.yaml`).then(response => {
        return yaml.safeLoad(response.data)
    }).catch(err => {
        console.error(err)
    })
}

function filterPodEnvVariables(){
    let enviromentOpenshiftVariables = {}
    Object.keys(process.env).forEach(key => {
        const envKey = String(key)
        if(envKey.endsWith("SERVICE_PORT")){
            const keyIndex = envKey.indexOf("SERVICE_PORT")
            const key = envKey.slice(0,keyIndex - 1)
            if(enviromentOpenshiftVariables[key] === undefined){
                enviromentOpenshiftVariables[key] = {}
            }
            enviromentOpenshiftVariables[key].port = process.env[envKey]
        }else if(envKey.endsWith("SERVICE_HOST")){
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

