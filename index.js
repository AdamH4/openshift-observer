var express = require('express')
var app = express()
const axios = require('axios')

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
 * @api [get] /reddit/:subreddit
 * description: Call specific subreddit and return data from it
 * responses:
 *   200:
 *     description: Data from subreddit.
 */
app.get('/pods', (req,res) => {
    res.json(filterPodEnvVariables())
})

function filterPodEnvVariables(){
    let enviromentVariablesOfPods = {}
    Object.keys(process.env).forEach(key => {
        if(String(key).includes("SERVICE_PORT") || String(key).includes("SERVICE_HOST")){
            enviromentVariablesOfPods[key] = process.env[key]
        }
    })
    return enviromentVariablesOfPods
}


app.listen(8080, function () {
   console.log("Example app listening at port 8080")
})

