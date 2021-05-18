<template>
    <div  v-if="dialog">
        <div @click="outerDialogClick()" class="dialog__background">
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
                        <h2>Specification</h2>
                        <div>
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
    $grey: #1a1a1a;
    $green: #71F695;
    $textColor: #9d9d9d;
    .dialog__background{
        background-color: rgba(0,0,0,0.8);
        cursor: pointer;
        height: 100vh;
        left: 0;
        position: absolute;
        top:0;
        width: 100%;
        z-index: 100;
    }
    .dialog__wrapper{
        display: flex;
        justify-content: center;
        z-index: 100;
    }
    .dialog__card{
        background-color: $grey;
        border-radius: 7px;
        padding: 15px;
        position: absolute;
        z-index: 100;
        min-width: clamp(30%, 30%, 100%);
    }
    .dialog__header{
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: $green;
    }
    .pod__description{
        margin: 15px 0;
    }
    .first__name{
        border-top: 1px solid rgb(216, 216, 216);
    }
    .pod__oas h2 {
        margin: 15px 0;
        color: $textColor;
    }

</style>