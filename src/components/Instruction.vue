<template>
  <div class="instructions">
    The tests contains 10 questions which will appear one by one. You will have 10 minutes for the test. 
    <div class="start mt-3 mb-1">

      <b-button v-if="questionsAvailable" variant="primary" @click='startQuiz' lg block>Start</b-button>
      <b-button v-else variant="secondary" disabled lg block>Please wait</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name:"Instruction",
  props:['questionsAvailable'],
  methods:{
    startQuiz:function(){
      this.$emit('startQuiz');
    }
  }
}
</script>

<style scoped lang="scss">
.instructions{
  font-size: 25px;
  max-width: 800px;
  margin: 50px auto;
  color: black;
  position: relative;
  top: 40px;
  box-shadow: 0px 0px 10px 2px white;
  margin-top: 5px;
  padding: 5px 10px;
  background: white;
}
</style>