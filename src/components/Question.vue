<template>
<div>
    <div class="question">Q{{questionIndex+1}}: {{question}}</div>
    <div class="options_wrapper">
        <Option v-for="option in validOptions" @response='response' :responsed='responsed' :key="option.key" :isCorrect="option.isCorrect" v-bind:optionText='option.optionText'/>
    </div>
    <div class="navigator">
        <b-button variant="primary" @click='shift' size="lg" data-shiftDirection='-1'>Prev</b-button>
        <b-button variant="primary" @click='shift' size="lg" data-shiftDirection='1'>Next</b-button>
    </div>
    <div class="description" v-if="responsed">
            {{description}}
    </div>
</div>
</template>

<script>
import Option from  './Option.vue';
export default {
    name:"Question",
    props:['question','options','correct_options','responsed','questionIndex','description'],
    components:{Option},
    computed:{
        validOptions:function(){
            let valid_options=[];
            for(let option in this.$props.options)
            {
                if(this.$props.options[option])
                {
                    valid_options.push({'key':option,'optionText':this.$props.options[option],'isCorrect':this.$props.correct_options[option+'_correct']});
                }
            }
            return valid_options;
        }
    },
    data(){
        return{}
    },
    methods:{
        response:function(value){
            this.$emit('response',this.$props.questionIndex,value)
        },
        shift:function(e){
            this.$emit('shift',this.$props.questionIndex,parseInt(e.target.getAttribute('data-shiftDirection')))
        }
    }
}
</script>

<style scoped lang="scss">
.question{
    font-size: 26px;
    max-width: 900px;
    text-align: center;
    margin: 30px auto;
}
.options_wrapper{
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(auto-fit,minmax(100px,300px));
}
.navigator{
    max-width: 900px;
    margin: 30px auto;
    display: flex;
    justify-content: space-between;
}
</style>