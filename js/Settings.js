import { Quiz } from './Quiz.js';
export class settings{
    constructor(){
    this.CategoryElement = document.getElementById("category");
    this.difficultyElement  = document.getElementsByName("difficulty");
    this.numberElement = document.getElementById("numOfQuestions")
    this.startBtn = document.getElementById("startBtn")
    this.startBtn.addEventListener("click",this.getData.bind(this))
    }
   
    async getData(){
        if(this.numberElement.value > 0 && this.numberElement.value != ""){
            let CategoryElement = this.CategoryElement.value;
            let numberElement = this.numberElement.value;
            let difficulty = [...this.difficultyElement].filter((item)=>(item.checked == true))[0].value;
            //console.log(difficulty)
            let apiUrl = `https://opentdb.com/api.php?amount=${numberElement}&category=${CategoryElement}&difficulty=${difficulty}`
            let myResults = await this.fetApi(apiUrl)
            //console.log(myResults)
            $("#formAlert").fadeOut(1000)
            $("#setting").fadeOut(1000,()=>{
                $("#quiz").fadeIn(1000)})
            new Quiz(myResults);
        }
        else{
            $("#formAlert").fadeIn(1000)
        }
    }
    async fetApi(url){
        let response = await fetch(url)
        let myResult = await response.json()
        //console.log(myResult.results)
        return myResult.results
    }

}