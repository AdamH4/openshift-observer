<template>
  <div class="accordion__wrapper">
    <div
      v-for="(item, index) in items"
      :key="index"
    >
    <div class="accordion__header" @click="toggleSection(index)">{{item.name}}</div>
      <transition name="slide">
        <div class="row__detail" v-if="openedSectionIndex === index">
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
.accordion__header{
  padding: 1.3rem;
}
.accordion__wrapper{
  border-radius: 10px;
  background-color: #eee;
  border: 1px solid #ccc;
}
.row__detail{
  background-color: #bbb;
  padding: 0.7rem;
}

.slide-enter-active{
  animation: slide-down 0.5s ease;
}
.slide-leave-active {
  animation: slide-down 0.5s reverse;
}

@keyframes slide-down {
  0%{
    opacity: 0;
    transform: translateY(-15px);
  }
  100%{
    opacity: 1;
    transform: translateY(0px);
  }
}


</style>