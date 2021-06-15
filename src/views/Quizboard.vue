<template>
  <div class="quizboard">
    <div class="header bg-primary">
      <h1 class="topic">{{ topic }}</h1>
      <div class="d-flex align-items-center justify-content-center">
        <b-button variant="outline-light" size="md" @click='submit'>Submit</b-button>
      </div>
      <h1 class="time">{{ remaining_time }}</h1>
    </div>
    <div class="main">
      <Instruction
        v-bind:questionsAvailable="isQuestionsAvailable"
        @startQuiz="startQuiz"
        v-if="!quizStart"
      />
      <Question
        v-else
        v-bind:questionIndex="questionIndex"
        v-bind:question="question"
        v-bind:options="options"
        v-bind:description="description"
        v-bind:correct_options="correct_options"
        v-bind:responsed="responsed"
        @response='response'
        @shift='shift'
      />
    </div>
  </div>
</template>

<script>
import Instruction from "../components/Instruction.vue";
import Question from "../components/Question.vue";
export default {
  name: "Quizboard",
  props: ["difficulty", "topic"],
  components: { Instruction, Question },
  data() {
    return {
      remaining_seconds: 0,
      remaining_minutes: 10,
      quizOver: false,
      quizStart: false,
      isQuestionsAvailable: false,
      questions: [],
      question: null,
      options: null,
      correct_options: null,
      description: null,
      responsed:false,
      responses:[],
      questionIndex:0,
    };
  },
  computed: {
    remaining_time: function () {
      return `${this.$data.remaining_minutes
        .toString()
        .padStart(2, "0")}:${this.$data.remaining_seconds
        .toString()
        .padStart(2, "0")}`;
    },
  },
  methods: {
    startQuiz: function () {
      this.$data.quizStart = true;
      let vm = this;
      setInterval(function () {
        if (
          vm.$data.remaining_minutes == 0 &&
          vm.$data.remaining_seconds == 0
        ) {
          vm.$data.quizOver = true;
        }
        if (vm.$data.remaining_seconds == 0) {
          vm.$data.remaining_minutes -= 1;
          vm.$data.remaining_seconds = 59;
        }
        vm.$data.remaining_seconds -= 1;
      }, 1000);
      this.presentQuestion(0);
    },
    presentQuestion: function (index) {
      if (index >= 0 && index <= 10) {
        let curr_question = this.$data.questions[index];
        this.$data.questionIndex=index;
        this.$data.question = curr_question.question;
        this.$data.options = curr_question.answers;
        this.$data.correct_options = curr_question.correct_answers;
        this.$data.description = curr_question.description;
        if(this.$data.responses[index]==null)
        {
          this.$data.responsed=false;
        }
        else{
          this.$data.responsed=true;
        }
      }
    },
    response:function(questionIndex,value){
        this.$data.responses[questionIndex]=value;
        this.$data.responsed=true;
    },
    shift:function(index,direction)
    {
      let newIndex = index+direction;
      if(newIndex>=10)
      {
        alert("Last question")
      }
      else if(newIndex<0)
      {
        alert("First question")
      }
      else{
        this.presentQuestion(newIndex);
      }
    },
    submit:function(){
      this.$data.quizOver=true;
    }
  },
  mounted: function () {
    for(let i=0;i<10;i++)
    {
      this.$data.responses.push(null);
    }
    this.axios
      .get("", {
        params: {
          difficulty: this.$props.difficulty,
          category: this.$props.topic,
          limit: 10,
        },
      })
      .then((res) => {
        this.$data.isQuestionsAvailable = true;
        this.$data.questions = res.data;
      })
      .catch((err) => {
        if(err.response.status==404){
          alert("No questions found!!.\nPlease try something else");
          this.$router.push("/");
        }
      });
  },
  watch:{
    quizOver:function(){
      this.$router.push({name:"Result",params:{'responses':this.$data.responses,'remaining_time':this.remaining_time}});
    }
  }
};
</script>

<style scoped lang="scss">
.quizboard {
  .header {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    .topic,
    .time {
      color: map-get($colors, "text");
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>
