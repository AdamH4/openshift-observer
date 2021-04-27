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
          {{item.paths}}
          jasn djasnd jasnd asd jasdnaskdj naskdj nasjkdnaskjdn askjdn askjdn askjdn askdnaskdn askdj naskdj asnd aksjd nasdkj asnd kjasdn askjdasndkasjdn askjdansdaskjdasnd asnsajcxnsajkxasxkjnkc ansdaksjdkasnd kjasd nasj dnasd nasd asd asdnasd jnjrekne kwfnkbckjebfsdfjkbewfcwdjkwe ew bwe bwe bwecj wbec ke ef wekj wekjf nwejfn wefn wfk we
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
  position: absolute;
  top: 19%;
  right: 30px;
  transform: rotate(45deg);
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
  background-color: #eee;
  padding: 0.7rem;
  padding: 3rem 1rem;
  border: 2px solid $red;
}
.selected__section{
  background-color: $red;
  color: white;
  border-radius: $radius;
}

.slide-enter-active{
  animation: slide-down 1ms linear;
}
// .slide-leave-active {
//   animation: slide-down 0.2s reverse;
// }

@keyframes slide-down {
  0%{
    /* transform: translateY(-15px); */
    opacity: 0.5;
    height: 0;
  }
  100%{
    opacity: 1;
    /* transform: translateY(0px); */
    height: 100%;
  }
}


</style>