const db = require('./config.js')

const getAllPods = async () => {
  let pods = []
  try {
    pods = await db("pods").select()
  } catch (e) {
    console.error(e)
  }
  return pods
}

const insertPod = async (pod) => {
  try {
    await db("pods").insert({
      name: pod.name,
      oas: pod.oas,
      host: pod.host,
      port: pod.port
    })
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  getAllPods,
  insertPod
}