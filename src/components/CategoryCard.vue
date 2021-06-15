<template>
  <div>
  <b-modal id="difficultyModal" v-model="modalVisibility" hide-header hide-footer>
      <h3 class="text-center modalTitle">Choose difficulty</h3>
      <div class="button_wrapper text-center">
          <b-button block variant="outline-success" class="my-3" size="lg" data-difficulty='easy' @click="setDifficulty">Easy</b-button>
          <b-button block variant="outline-warning" class="my-3" size="lg" data-difficulty='medium' @click="setDifficulty">Medium</b-button>
          <b-button block variant="outline-danger" class="my-3" size="lg" data-difficulty='hard' @click="setDifficulty">Hard</b-button>
      </div>
  </b-modal>
  <div class="CategoryCard" @click="openDifficultyModal">

      <h3 class="h3">{{title}}</h3>
  </div>
  </div>
</template>

<script>
export default {
    name:"CategoryCard",
    props:["title"],
    data(){
        return{
            modalVisibility:false,
            topic:null,
            difficulty:null,
        }
    },
    methods:{
        openDifficultyModal:function(){
            this.$data.topic=this.$props.title;
            this.$data.modalVisibility=true;
        },
        setDifficulty:function(e){
            this.$data.modalVisibility=false;
            let difficulty = e.target.getAttribute("data-difficulty");
            this.$data.difficulty=difficulty;
            this.$emit('fetchQuestions',{"topic":this.$data.topic,"difficulty":this.$data.difficulty})
        }
    }
}
</script>

<style scoped lang="scss">
.CategoryCard{
    width: 200px;
    height: 200px;
    border-radius: 15px;
    box-shadow: 0px 0px 5px 1px map-get($colors, "secondary");
    background: linear-gradient(45deg,map-get($colors,"primary"),map-get($colors,"secondary"),);
    cursor: pointer;
    transition-property: all;
    transition-duration: 300ms;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:0px;
    &:hover{
        box-shadow:0px 0px 10px 2px map-get($colors, "primary"); ;
        background: linear-gradient(45deg,map-get($colors,"secondary"),map-get($colors,"primary"),);
    }
    .h3{
        color: map-get($colors,"text" );
        margin: 0px;
        padding: 0px;
        overflow-wrap: anywhere;
    }
}
#difficultyModal{
    .modalTitle{
        font-family: $playfair;
        color:map-get($colors, "primary" );
        text-decoration: underline;
    }
}

</style>