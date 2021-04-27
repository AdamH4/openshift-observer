<template>
  <div class="accordion__wrapper">
    <div
      v-for="(item, index) in items"
      :key="index"
    >
      <div 
        :class="[openedSectionIndex === index ? 'selected__section': '', 'accordion__header']"
        @click="toggleSection(index)"
      >
        <span>
          {{item.name}}
        </span>
        <span :class="['section__symbol', openedSectionIndex === index ? 'rotate__element' : '']">
          &#215;
        </span>
      </div>
      <transition name="slide">
        <div class="row__detail" v-if="openedSectionIndex === index">
          <h3>Services</h3>
          <div v-for="(path, index) in item.paths" :key="index" class="pod__path">
            {{path}}
          </div>
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

<style lang="scss">
$red: #e04e50;
$grey: #eee;
$radius: 5px;
$blue: #2c3e50;
$white: #ffffff;
.accordion__header{
  background-color: $grey;
  border-radius: $radius;
  padding: 1.3rem;
  position: relative;
}
.accordion__header:hover{
  background-color: $red;
  border-radius: $radius;
  color: white;
  cursor: pointer;
}
.section__symbol{
  font-size: 30px;
  float:right;
  height: 35px;
  position: absolute;
  right: 30px;
  text-align: center;
  top: 19%;
  transform: rotate(45deg);
  width: 35px;
}
.rotate__element{
  transform: rotate(0deg);
}
.accordion__wrapper{
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

}
.row__detail{
  background-color: $white;
  padding: 0.7rem;
  padding: 3rem 1rem;
  border: 2px solid $red;
}
.selected__section{
  background-color: $red;
  color: white;
  border-radius: $radius;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}

.pod__path{
  font-weight: bold;
  padding: 5px;
  color: $blue;
}

</style>