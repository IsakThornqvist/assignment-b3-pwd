export const template = document.createElement('template')

template.innerHTML = `
<div id='quizContainer'> 

<nickname-form id='nickname-form'> </nickname-form>
<quiz-questions id='quiz-questions' class='hide'> </quiz-questions>
<countdown-timer id='countdown-timer' class='hide'> </countdown-timer>
<high-score id='high-score' class='hide'> </high-score>

</div>
<style>


.hide {
  display: none;
}
</style>

`
