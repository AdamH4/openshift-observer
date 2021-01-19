<template @click="doSomething()">
  <div id="graph"></div>
  <div v-if="dialog" class="pod__detail" id="podDetail">
    <div class="detail__content">
      <div>{{selectedPod.label}}</div>
      <div>{{selectedPod.id}}</div>
    </div>
  </div>
  <Pods :nodes="nodes"/>
</template>

<script>
import Pods from '@/components/Pods'
import { DataSet,Network } from 'vis'
import { onMounted, ref } from 'vue'
import { getCurrentInstance } from 'vue'

export default {
  name: 'App',
  components:{
    Pods
  },
  setup(){
    const app = getCurrentInstance()
    const axios = app.appContext.config.globalProperties.axios
    const response = ref([])
    axios.get("/pods").then(res => response.value = res)
    const dialog = ref(false)
    const selectedPod = ref({})
    const container = ref(null)
    const nodes = [
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'},
        {id: 6, label: 'Node 6'},
    ]
    const edges = [
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5}
    ]
    const dataNodes = new DataSet(nodes)
    const dataEdges = new DataSet(edges)
    const data = {
        nodes: dataNodes,
        edges: dataEdges
    }
    const options = {
      clickToUse: true,
    }

    onMounted(() => {
      container.value = document.getElementById('graph');
      const network = new Network(container.value, data, options);
      network.on("click", (e) => {
        if(e.nodes.length > 0){
          selectedPod.value = nodes.find(node => node.id === e.nodes[0])
          dialog.value = true
        }else{
          selectedPod.value = {}
          dialog.value = false
        }
      })
      document.addEventListener("click", (e) => {
        if(e.target !== document.getElementById('podDetail')
          && Object.keys(selectedPod.value).length === 0){
          dialog.value = false
        }
      })
    })

    return {
      dialog,
      selectedPod,
      nodes,
    }
  }
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
  text-align: center;
  color: #2c3e50;
}
#graph {
    width: 100%;
    height: 400px;
    margin: 20px auto;
}
.pod__detail{
  position: absolute;
  width: 30%;
  top: 0;
  height: 420px;
  background-color: #dddddd;
  opacity: 0.6;
}
.detail__content{
  padding: 1rem;
}
.detail__content div{
  padding: 1rem;
}
</style>
