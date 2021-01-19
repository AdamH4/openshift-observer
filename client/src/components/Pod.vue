<template>
    <div class="row__content">
        <div class="col_content" v-for="(prop,index) in node" :key="index">
            {{prop}}
        </div>
    </div>
</template>
<script>
export default {
    name: 'Pod',
    props:{
        node: Object,
    },
    setup(){

    }
}
</script>
<style>
.row__content{
    display:flex;
    padding: 0.5rem;
}
.col_content{
    flex: 1;
}
</style>