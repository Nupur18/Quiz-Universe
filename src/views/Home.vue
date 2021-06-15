<template>
  <div class="home">
    <div class="title">
      <h1 class="h1">Quiz Universe</h1>
    </div>
    <div class="card_wrapper">     
    <CategoryCard v-for="(topic,index) in topics" :key="index" v-bind:title="topic" @fetchQuestions='fetchQuestions'/>
    </div>
  </div>
</template>

<script>
import CategoryCard from '../components/CategoryCard.vue';
export default {
  name: 'Home',
  components: {
    CategoryCard
  },
  data(){
    return {
      topics:["Linux","DevOps","Programming","Cloud","Docker","Kubernetes",]
    }
  },
  methods:{
    fetchQuestions:function(data){
      this.$router.push({path:"/quizboard",query:{"difficulty":data.difficulty,"topic":data.topic } })
    }
  }
}
</script>
<style scoped lang="scss">
.home{
  .title{
    .h1{
      color: map-get($colors,"text" );
      text-align: center;
      margin: 10px 0px;
      text-transform: capitalize;
      font-family: $playfair;
    }
  }
  .card_wrapper{
    padding: 2vw;
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(auto-fit,250px);
  }
}
</style>