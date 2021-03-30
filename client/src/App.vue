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
    pods: {},
    nodes: [],
    edges: [],
    options: {
      clickToUse: true,
    },
  }),
  
  async mounted(){
      // const response = await this.axios.get("/pods")
      // console.log(this.axios)
      const response = [ {
    NODE_OPENSHIFT_TEST: {
      port: "8080",
      host: "172.25.190.25",
      specification: {
        openapi: "3.0.3",
        info: {
          description: "Testing app for bakalarsky project",
          version: "1.0.1",
          title: "Openshift node pod"
        },
        paths: {
          '/': {
            get: {
              description: "Greeting from server",
              responses: {
                200: {
                  description: "Greeting message."
                }
              }
            }
          },
          '/service': {
            get: {
              description: "Call another pod in Openshift cluster(like middleware)",
              responses: {
                200: {
                  description: "Response from pod."
                }
              }
            }
          },
          '/reddit/:subreddit': {
            get: {
              description: "Call specific subreddit and return data from it",
              responses: {
                200: {
                  description: "Data from subreddit."
                }
              }
            }
          }
        }
      }
    }
  },
  {
    TEST_VUE_OPENSHIFT: {
      port: "80",
      host: "172.25.33.103",
      specification: {}
    }
  },
  {
    NODE_3RD_PARTY_APP: {
      port: "8080",
      host: "172.25.79.208",
      specification: {}
    }
  },
  {
    OSN_ANIMALS: {
      port: "8080",
      host: "172.25.151.2",
      specification: {
        openapi: "3.0.3",
        info: {
          description: "Testing app for bakalarsky project",
          version: "1.0.1",
          title: "Openshift node pod"
        },
        paths: {
          '/': {
            get: {
              description: "Greeting from server",
              responses: {
                200: {
                  description: "Greeting message."
                }
              }
            }
          },
          '/animals': {
            get: {
              description: "Call another pod in Openshift cluster(like middleware)",
              responses: {
                200: {
                  description: "Response from pod."
                }
              }
            }
          }
        }
      }
    }
  },
  {
    POSTGRESQL: {
      port: "5432",
      host: "172.25.191.190",
      specification: {}
    }
  }
]
      // const response = [
      //   { id: 10, label: 'pod1', host: "147.123.123.123", port: "8080", oas: {desc: "nieco", name: "pod", path: { name:"home"} }},
      //   { id: 20, label: 'pod2', host: "147.123.123.124", port: "8080", oas: {desc: "nieco", name: "pod", path: { name:"home"} } },
      //   { id: 30, label: 'pod3', host: "147.123.123.125", port: "8080", oas: {desc: "nieco", name: "pod", path: { name:"home"} } },
      //   { id: 40, label: 'pod4', host: "147.123.123.126", port: "8080", oas: {desc: "nieco", name: "pod", path: { name:"home"} } },
      // ]
      this.pods = response
      response.forEach(pod =>{
        const podKeyName = Object.keys(pod)[0]
        pod.label = podKeyName
        pod[podKeyName].label = podKeyName
      })

      this.nodes = new DataSet(response)

      const data = {
          nodes: this.nodes,
          edges: new DataSet(this.edges)
      }
      this.container = document.getElementById('graph');
      const network = new Network(this.container, data, this.options);
      network.on("click", (e) => {
        if(e.nodes.length > 0){
          const node = this.nodes.get(e.nodes[0])
          this.selectedPod = node[Object.keys(node)[0]]
          console.log(this.selectedPod)
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
</style>
