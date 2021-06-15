<template>
  <div class="result">
      <h3 class="h3">Time remaining {{time_remaining}}</h3>
      <h3 class="h3">Total Questions {{total_questions}}</h3>
      <h3 class="h3">Attempted Questions {{correct_questions+incorrect_questions}}</h3>
      <h3 class="h3">Correct Questions {{correct_questions}}</h3>
      <h3 class="h3">Incorrect Questions {{incorrect_questions}}</h3>
      
      <router-link to="/"><b-button variant="success">Home</b-button></router-link>
  </div>
</template>

<script>
export default {
    name:"Result",
    data(){
        return{
            time_remaining:null,
            total_questions:0,
            incorrect_questions:0,
            correct_questions:0,
        }
    },
    mounted:function(){
        this.$data.time_remaining=this.$route.params.remaining_time,
        this.$data.total_questions = this.$route.params.responses.length;
        let correct=0;
        let incorrect=0;
        for(let response of this.$route.params.responses)
        {   
            if(response=="true")
            {
                correct=correct+1;
            }
            else if(response=="false")
            {
                incorrect=incorrect+1;
            }
        }
        this.$data.correct_questions=correct;
        this.$data.incorrect_questions=incorrect;
    }
}
</script>

<style scoped lang='scss'>
.result{
    max-width: 900px;
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}

</style>