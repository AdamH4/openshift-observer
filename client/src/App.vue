<template>
  <PodDetail :pod="selectedPod" :open="dialog" @closeDialog="dialog = false" />
  <div class="page">
    <div id="graph"></div>
    <div class="accordion__section">
      <Accordion v-if="pods.length" :items="pods"/>
    </div>
  </div>
</template>

<script>
import PodDetail from '@/components/PodDetail'
import Accordion from '@/components/Accordion'
import { DataSet,Network } from 'vis'
import { getCurrentInstance } from 'vue'
import Background from "./assets/bg.png"

export default {
  name: 'App',
  components:{
    PodDetail, Accordion
  },
  data: () => ({
    dialog: false,
    selectedPod: {},
    container: null,
    pods: [],
    nodes: [],
    edges: [],
    options: {
      clickToUse: true,
      nodes: {
        shape: "dot",
        color: {
          border: "#71F695",
          background: "#000000",
          highlight: {
            border: "#ffffff",
            background: "#000000",
          }
        },
        borderWidth: 3,
        borderWidthSelected: 2,
        font: {
          color: "#ffffff",
          size: 20,
        }
      }
    },
  }),
  
  async mounted(){
      const app = getCurrentInstance()
      const axios = app.appContext.config.globalProperties.axios
      const response = await axios.get("http://localhost:8081/pods")
      this.pods = response.data.map(pod =>{
        const label = pod.name
        return {...pod, label}
      })

      this.nodes = new DataSet(this.pods)

      const data = {
          nodes: this.nodes,
          edges: new DataSet(this.edges)
      }
      this.container = document.getElementById('graph')
      const network = new Network(this.container, data, this.options)
      network.on("beforeDrawing", (ctx) => {
        const image = new Image()
        image.src = Background
        image.onload = () => {
          const x = ((ctx.canvas.width / 2) - image.width)  / 2
          const y = ((ctx.canvas.height / 2) - image.height) / 2
          ctx.drawImage(image, x, y)
        }
      })
      network.on("click", (e) => {
        if(e.nodes.length > 0){
          this.selectedPod = this.nodes.get(e.nodes[0])
          this.dialog = true
        }else{
          this.selectedPod = {}
          this.dialog = false
        }
      })
  },
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.page {
  background-color: #000000;
  display: grid;
  grid-template-columns: 3fr 2fr;
  height: 100vh;
}
#graph {
    width: 100%;
    height: 100vh;
    margin: 0px auto;
}
.accordion__section{
  background-color: #0B0B0B;
}
</style>
