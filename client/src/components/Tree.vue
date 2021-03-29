<template>
    <div class="next__iteration" v-if="Object.keys(compoundEntries).length">
        <div v-for="(value,key,index) in compoundEntries" :key="index">
            <div @click="open[index] = !open[index]" @mouseover="hover[index] = true" @mouseleave="hover[index] = false" class="parent">
                <OpeningArrow :open="open[index]" :hover="hover[index]" />
                <span class="parentText">
                    {{ key }}
                </span> 
            </div>
            <Tree v-if="open[index]" :data="value" />
        </div>
    </div>
    <div class="tree__item" v-for="(value, key) in directEntries" :key="key">
        <span class="direct__name">
            {{ key }} 
        </span>
        <span class="direct__value">
            - "{{ value }}"
        </span>
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
        hover: [],
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

<style>
    .tree__item{
        padding: 5px 0 5px 20px;
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
    .direct__name{
        text-decoration: underline;
        color: rgb(247, 138, 138);
        margin-right: 10px;
    }
    .direct__value{

    }
</style>