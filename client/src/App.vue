<template>
  <div id="graph"></div>
</template>

<script>
import { DataSet,Network } from 'vis'
import { onMounted } from 'vue'
import { getCurrentInstance } from 'vue'

export default {
  name: 'App',
  async setup(){
    const app = getCurrentInstance()
    const axios = app.appContext.config.globalProperties.axios

    const pods = await axios.get("/pods").then(res => console.log(res))

    onMounted(() => {
      const nodes = new DataSet([
          {id: 1, label: 'Node 1'},
          {id: 2, label: 'Node 2'},
          {id: 3, label: 'Node 3'},
          {id: 4, label: 'Node 4'},
          {id: 5, label: 'Node 5'},
          {id: 6, label: 'Node 5'},
      ]);

      const edges = new DataSet([
          {from: 1, to: 3},
          {from: 1, to: 2},
          {from: 2, to: 4},
          {from: 2, to: 5}
      ]);

      const container = document.getElementById('graph');

      const data = {
          nodes: nodes,
          edges: edges
      };
      const options = {};
      new Network(container, data, options);
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#graph {
    width: 600px;
    height: 400px;
    border: 1px solid lightgray;
    margin: 20px auto;
}
</style>
