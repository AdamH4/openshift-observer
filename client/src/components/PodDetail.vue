<template>
    <div  v-if="dialog">
        <div @click="outerDialogClick()" class="dialog__background" >
        </div>
        <div class="dialog__wrapper">
            <div class="dialog__card">
                <div class="dialog__header">
                    <div>
                        <h1>
                            {{ pod.label }}
                        </h1>
                    </div>
                    <div v-if="pod.buildSource">
                        <a class="source__link" target="_blank" :href="pod.buildSource">Repo</a>
                    </div>
                </div>
                <Divider />
                <div class="dialog__content">
                    <div class="pod__description">
                        <ListItem label="Cluster" :value="pod.clusterName" />
                        <ListItem label="Host" :value="pod.url" />
                        <ListItem label="Cluster" :value="pod.clusterName" />
                        <ListItem label="Created" :value="(new Date(pod.creationDate)).toLocaleString()" />
                    </div>
                    <div v-if="Object.keys(pod.specification).length" class="pod__oas">
                        <h4>Specification</h4>
                        <div class="oas__specification">
                            <TreeMenu :data="pod.specification"/>
                        </div>
                    </div>
                </div>
                <div class="dialog__footer">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TreeMenu from '@/components/TreeMenu'
import Divider from '@/components/Divider'
import ListItem from '@/components/ListItem'
export default {
    components: {
        Divider, TreeMenu, ListItem
    },
    props: {
        pod: Object,
        open: Boolean,
    },
    data: () => ({
        dialog: false,
    }),
    watch: {
        open(value){
            this.dialog = value
        }
    },
    methods: {
        outerDialogClick(){
            this.dialog = false
            this.$emit("closeDialog")
        }
    }
}
</script>

<style lang="scss" scoped>
    
    .dialog__background{
        background-color: rgba(0,0,0,0.5);
        cursor: pointer;
        height: 100vh;
        left: 0;
        position: absolute;
        top:0;
        width: 100%;
        z-index: 100;
    }
    .dialog__wrapper{
        align-items: center;
        display: flex;
        justify-content: center;
        z-index: 100;
    }
    .dialog__card{
        background-color: white;
        border-radius: 5px;
        padding: 15px;
        position: absolute;
        box-shadow: 15px 15px #2c3e50;
        z-index: 100;
        min-width: clamp(30%, 30%, 100%);
    }
    .dialog__header{
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .pod__description{
        margin: 15px 0;
    }
    .first__name{
        border-top: 1px solid rgb(216, 216, 216);
    }
    .pod__oas h4 {
        margin: 15px 0;
    }
    .oas__specification{
        border: 1px solid #cecece;
        background-color: #fffbdf;
        border-radius: 3px;
    }

</style>