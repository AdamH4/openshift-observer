<template >
    <div id="graph"></div>

    <PodDetail :pod="selectedPod" :open="dialog" @closeDialog="dialog = false" />

    <!-- <div v-if="dialog" class="pod__detail" id="podDetail">
      <div class="detail__content">
        <div>{{selectedPod.label}}</div>
        <div>{{selectedPod.host}}</div>
        <div>{{selectedPod.port}}</div>
      </div>
    </div> -->
    <!-- <Pods :nodes="nodes"/> -->
</template>

<script>
// import Pods from '@/components/Pods'
import PodDetail from '@/components/PodDetail'
import { DataSet,Network } from 'vis'
// import { onMounted, ref } from 'vue'
// import { getCurrentInstance } from 'vue'
// import testData from '@/assets/test.json'

export default {
  name: 'App',
  components:{
    PodDetail 
  },
  data: () => ({
    dialog: false,
    selectedPod: {},
    container: null,
    nodes: [],
    edges: [],
    options: {
      clickToUse: true,
    },
  }),
  
  mounted(){
      const response = [
        { id: 10, label: 'pod1', host: "147.123.123.123", port: "8080", oas: {desc: "nieco", name: "pod", path: { name:"home"} }},
        { id: 20, label: 'pod2', host: "147.123.123.124", port: "8080", oas: {desc: "nieco", name: "pod", path: { name:"home"} } },
        { id: 30, label: 'pod3', host: "147.123.123.125", port: "8080", oas: {desc: "nieco", name: "pod", path: { name:"home"} } },
        { id: 40, label: 'pod4', host: "147.123.123.126", port: "8080", oas: {desc: "nieco", name: "pod", path: { name:"home"} } },
      ]
      this.nodes = response
      const data = {
          nodes: new DataSet(this.nodes),
          edges: new DataSet(this.edges)
      }
      this.container = document.getElementById('graph');
      const network = new Network(this.container, data, this.options);
      network.on("click", (e) => {
        if(e.nodes.length > 0){
          this.selectedPod = this.nodes.find(node => node.id === e.nodes[0])
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
  color: #2c3e50;
}
#graph {
    width: 100%;
    height: 400px;
    margin: 20px auto;
}
</style>
