<template>
    <div  v-if="dialog">
        <div @click="outerDialogClick()" class="dialog__background" >
        </div>
        <div class="dialog__wrapper">
            <div class="dialog__card">
                <div class="dialog__header">
                    <h1 >{{ pod.label }}</h1>
                </div>
                <Divider />
                <div class="dialog__content">
                    <div class="pod__description">
                        <div class="list__item first__name">
                            <div class="item__name">Port</div>
                            <div class="item__value">{{ pod.port}}</div>
                        </div>
                        <div class="list__item">
                            <div class="item__name">Host</div>
                            <div class="item__value">{{ pod.host}}</div>
                        </div>
                    </div>
                    <div class="pod__oas">
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
export default {
    components: {
        TreeMenu, Divider
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

<style scoped>
    .dialog__background{
        background-color: rgba(0,0,0,0.5);
        cursor: pointer;
        height: 100%;
        left: 0;
        position: absolute;
        top:0;
        width: 100%;
    }
    .dialog__wrapper{
        align-items: center;
        display: flex;
        justify-content: center;
    }
    .dialog__card{
        background-color: white;
        border-radius: 5px;
        padding: 15px;
        position: absolute;
        box-shadow: 15px 15px #2c3e50;
    }
    .dialog__header{
        margin-bottom: 10px;
    }
    .list__item{
        padding: 6px 0;
        border-bottom: 1px solid rgb(216, 216, 216);
        display: flex;
        column-gap: 3em;
    }
    .list__item:hover{
        background-color: rgb(216, 216, 216);
        opacity: 0.7;
    }
    .pod__description{
        margin: 15px 0;
    }
    .first__name{
        border-top: 1px solid rgb(216, 216, 216);
    }
    .item__name{
        flex: 1;
        border-radius: 3px;
        padding: 5px;
    }
    .item__value{
        display: block;
        flex: 4;
        padding: 5px;
        text-align: end;
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