<template>
    <div class="table">
        <div class="table__header">
            <div class="table__col">Id</div>
            <div class="table__col">Name</div>
        </div>
        <Pod :class="['table__content',index === nodes.length - 1 ? 'last_row' : '']"
          v-for="(node,index) in nodes"
          :node="node" 
          :key="index"
        />
    </div>
</template>
<script>
import Pod from '@/components/Pod'

export default {
    name: 'Pods',
    props:{
        nodes: Array,
    },
    components:{
        Pod
    },
}
</script>
<style>
.table{
    margin: 0 20%;
}
.table__col{
    flex: 1;
}
.table__header{
    display:flex;
    background-color: #54a2ea;
    border-radius: 10px 10px 0 0;
    padding: 1rem;
    color: #ffffff;
}
.table__content{
    background-color: #dddddd;
}
.last__row{
    border-bottom: #54a2ea
}
</style>