<template >
    <div id="graph"></div>
    <PodDetail :pod="selectedPod" :open="dialog" @closeDialog="dialog = false" />
    <div class="container">
      <Accordion v-if="pods.length" :items="pods"/>
    </div>
</template>

<script>
import PodDetail from '@/components/PodDetail'
import Accordion from '@/components/Accordion'
import { DataSet,Network } from 'vis'
import { getCurrentInstance } from 'vue'

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
#graph {
    width: 100%;
    height: 400px;
    margin: 20px auto;
}
.container {
  margin: 0 5rem 5rem 5rem;
}
</style>
