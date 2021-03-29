<template>
    <div>
        <Tree :data="data" />
    </div>
  
</template>

<script>
import Tree from '@/components/Tree'
export default {
    components:{
        Tree
    },
    props:{
        data: {
            type: Object,
            required: true
        }
    },
}
</script>

<style>

</style>