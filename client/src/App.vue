<template @click="doSomething()">
  <div id="graph"></div>
  <div v-if="dialog" class="pod__detail" id="podDetail">
    <div class="detail__content">
      <div>{{selectedPod.label}}</div>
      <div>{{selectedPod.host}}</div>
      <div>{{selectedPod.port}}</div>
    </div>
  </div>
  <Pods :nodes="nodes"/>
</template>

<script>
import Pods from '@/components/Pods'
import { DataSet,Network } from 'vis'
import { onMounted, ref } from 'vue'
import { getCurrentInstance } from 'vue'
// import testData from '@/assets/test.json'

export default {
  name: 'App',
  components:{
    Pods
  },
  setup(){
    const app = getCurrentInstance()
    const axios = app.appContext.config.globalProperties.axios
    const dialog = ref(false)
    const selectedPod = ref({})
    const container = ref(null)
    const nodes = ref([])
    const edges = ref([])
    const options = {
      clickToUse: true,
    }

    onMounted(async () => {
      const response = await axios.get("/pods")
      nodes.value = response.data
      const data = {
          nodes: new DataSet(nodes.value),
          edges: new DataSet(edges.value)
      }
      container.value = document.getElementById('graph');
      const network = new Network(container.value, data, options);
      network.on("click", (e) => {
        if(e.nodes.length > 0){
          selectedPod.value = nodes.value.find(node => node.id === e.nodes[0])
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
  border-radius: 0 10px 10px 0;
}
.detail__content div{
  padding: 1rem;
}
</style>
