<template>
    <div class="row__content">
        <div class="col_content">
            {{node.id}}
        </div>
        <div class="col_content">
            {{node.name}}
        </div>
        <div class="col_content">
            {{node.host}}
        </div>
        <div class="col_content">
            {{node.port}}
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