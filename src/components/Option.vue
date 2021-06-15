<template>
  <div>
      <b-button v-bind:variant="getVariant" :disabled='responsed' @click="makeResponse"><span class="text-light">{{optionText}}</span></b-button>
  </div>
</template>

<script>

export default {
    name:'option',
    props:['optionText','responsed','isCorrect'],
    computed:{
        getVariant:function(){
            if(this.$props.responsed){
                if(this.$props.isCorrect=="true"){
                    return "success";
                }
                else{
                    return "danger";
                }
            }
            else{
                return "secondary"
            }
        }
    },
    methods:{
        makeResponse:function(){
            this.$emit('response',this.$props.isCorrect);
        }
    }

}
</script>

<style>

</style>