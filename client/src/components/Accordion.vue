<template>
  <div class="accordion__wrapper">
    <div
      v-for="(item, index) in items"
      :key="index"
      @click="toggleSection(index)"
    >
    <p>{{item.name}}</p>
      <transition>
        <div v-if="openedSectionIndex === index">
          {{item.paths}}
        </div>
      </transition>
    </div>   
  </div>
</template>

<script>
export default {
    name: "accordion",
    props: {
        items:{
            type: Array,
        }
    },
    data: () => ({
      openedSectionIndex: null,
    }),
    methods:{
      toggleSection(sectionIndex){
        if(sectionIndex === this.openedSectionIndex){
          this.openedSectionIndex = null
        }else{
          this.openedSectionIndex = sectionIndex
        }
      }
    }

}
</script>

<style>

</style>