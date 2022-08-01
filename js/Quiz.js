export class Quiz{
    constructor(arrayOfQue){
       
        this.arrayOfQue = arrayOfQue
        this.numQues = arrayOfQue.length
        document.getElementById("totalAmount").innerHTML = this.numQues
        this.questionElement = document.getElementById("question")
        this.currentElement = document.getElementById("current")
        this.rowAnswer = document.getElementById("rowAnswer")
        this.nextBtn = document.getElementById("next")
        this.score = 0
        this.currentQues = 0
        this.nextBtn.addEventListener("click",this.checkAnswer.bind(this))
        this.showQues()
        this.tryBtn = document.getElementById("tryBtn")
        
    }


    finish(){
        $("#quiz").fadeOut(700,()=>{
            $("#finish").fadeIn(500,()=>{
                $("#score").html(this.score)
            })
        })
        this.tryBtn.addEventListener("click",function(){
            location.reload()    
        })
    }
    checkAnswer(){
        let correctAnswer = this.arrayOfQue[this.currentQues].correct_answer
        let allAnswers = Array.from(document.getElementsByName("answers"))       
        let userAnswer = allAnswers.filter((elem)=>{return elem.checked})[0].value       
        if(userAnswer == correctAnswer){
            $("#Correct").fadeIn(700,()=>{
                $("#Correct").hide()
            })
            this.score++
        }else{
            $("#inCorrect").fadeIn(700,()=>{
                $("#inCorrect").hide()
            })
        }
        this.currentQues++
        if(this.currentQues >= this.numQues ){
            this.finish()
        }else{
            this.showQues()
        }
    }
    showQues(){
        this.currentElement.innerHTML = this.currentQues+1
        this.questionElement.innerHTML = this.arrayOfQue[this.currentQues].question
        let theAnswers = [this.arrayOfQue[this.currentQues].correct_answer,
        ...this.arrayOfQue[this.currentQues].incorrect_answers]
        
         theAnswers = this.shuffle(theAnswers)
         
        let cartona = ''
        for (let i = 0; i < theAnswers.length; i++) {
           cartona += `
           <div class="form-check">
           <input type="radio" name="answers" value="${theAnswers[i]}" class="form-check-input" />
           <label class="form-check-label">${theAnswers[i]}</label>
       </div>
           `
            
        }
        this.rowAnswer.innerHTML = cartona
    }


     shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
      
      // Used like so
    //   var arr = [2, 11, 37, 42];
    //   shuffle(arr);
    //   console.log(arr);

}