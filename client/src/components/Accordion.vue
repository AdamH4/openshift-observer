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
        <span v-if="openedSectionIndex === index">
          <img src="../assets/minus.svg" width="32" height="32"/>
        </span>
        <span v-else>
          <img src="../assets/plus.svg" width="32" height="32"/>
        </span>
      </div>
      <transition name="slide">
        <div class="row__detail" v-if="openedSectionIndex === index">
          <div class="detail__section">
            <h3 class="detail__heading">Services</h3>
            <div v-for="(value, key) in item.specification.paths" :key="key" class="pod__path">
              <div class="highlight__name">"{{key}}"</div>
              <div v-for="(route, method) in value" :key="`${key}-${method}`" class="padding__left">
                {{(String(method)).toUpperCase()}} : {{route.description}}
              </div>
            </div>
          </div>
          <div class="detail__section">
            <h3 class="detail__heading">Containers</h3>
            <div v-for="(container, index) in item.containers" :key="index" class="pod__path">
              <div class="highlight__name">
                {{container.uid}}
              </div>
              <div v-for="(value, key) in container.ports" :key="key" class="padding__left">
                {{value.protocol}} @ {{value.port}}
              </div>
            </div>
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
$red: #1c1c1c;
$grey: #0B0B0B;
$white: #ffffff;
$green: #71F695;
$textColor: #9d9d9d;
.accordion__header{
  padding: 2.5rem 1.5rem;
  position: relative;
  border: 1px solid rgba(255,255,255, 0.1);
  color: $white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.3rem
}
.accordion__header:hover{
  background-color: $red;
  color: $white;
  cursor: pointer;
}
.accordion__wrapper{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
}
.row__detail{
  background-color: $grey;
  padding: 0.7rem;
  padding: 1rem;
  border: 2px solid $red;
}
.selected__section{
  background-color: $red;
  color: $white;
}
.detail__heading{
  color: $green;
  margin: 10px 0;
  font-size: 26px;
}
.detail__section{
  padding: 1rem;
}
.pod__path{
  font-weight: bold;
  padding: 5px;
  color: $textColor;
}
.highlight__name{
  font-size: 20px;
  color: $white;
  padding: 10px 0;
}
.padding__left{
  padding-left: 15px;
}

</style>