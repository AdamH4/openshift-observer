<template>
    <div class="tree__item" v-for="(value, key) in directEntries" :key="key">
        <span class="direct__name">
            {{ key }} -
        </span>
        "<span class="direct__value">{{ value }}</span>"
    </div>
    <div class="next__iteration" v-if="Object.keys(compoundEntries).length">
        <div v-for="(value,key,index) in compoundEntries" :key="index">
            <div @click="open[index] = !open[index]" class="parent">
                <OpeningArrow :open="open[index]" />
                <span :class="[open[index] ? 'white' : 'green']">
                    {{ key }}
                </span> 
            </div>
            <Tree v-if="open[index]" :data="value" />
        </div>
    </div>
</template>

<script>
import OpeningArrow from "@/components/BaseOpeningArrow"
export default {
    name: "tree",
    components:{
        OpeningArrow
    },
    props: {
        data: Object
    },
    data: () => ({
        open: [],
    }),
    computed:{
        directEntries(){
            let temp = {}
            Object.keys(this.data).forEach(key => {
                if(typeof this.data[key] !== 'object'){
                    temp[key] = this.data[key]
                }
            })
            return temp
        },
        compoundEntries(){
            let temp = {}
            Object.keys(this.data).forEach(key => {
                if(typeof this.data[key] === 'object'){
                    temp[key] = this.data[key]
                }
            })
            return temp
        }
    },
}
</script>

<style lang="scss" scoped>
$grey: #9d9d9d;
.tree__item{
    padding: 5px 0 5px 20px;
    color: $grey;
}
.next__iteration{
    padding-left: 20px;
}
.parent{
    cursor: pointer;
    font-weight: bold;
    margin-left: -11px;
    display: flex;
    align-items: center;
}
.green {
    color: #71F695;
}
.white{
    color: #ffffff;
}
.direct__name{
    color: $grey;
    margin-right: 10px;
}
.direct__value{
    color: #ffffff;
}
</style>