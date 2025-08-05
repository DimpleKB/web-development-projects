const questions = [
  {
    question: "What is the output of typeof null in JavaScript?",
    options: ["null", "object", "undefined", "number"],
    answer: "object"
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "constant"],
    answer: "const"
  },
  {
    question: "What does the === operator do in JavaScript?",
    options: ["Compares value and type","Assigns value","Compares only values","Checks for truthy values"],
    answer: "Compares value and type"
  },
  {
    question: "What will this code return: Boolean([])?",
    options: ["false","true","undefined","error"],
    answer: "true"
  },
  {
    question: "Which of the following is a correct way to create a function?",
    options: ["function = myFunc() {}","function myFunc() {}","create function myFunc() {}","new function myFunc() {}"],
    answer: "function myFunc() {}"
  }
];

let curidx=0;
let score=0;

const questele=document.getElementById("question");
const optionele=document.getElementById("options");
const nextbtn=document.getElementById("next");
const resultEl=document.getElementById("result");
const scoreEl=document.getElementById("score");

function loadQuestion(){
    resetState();
    const current=questions[curidx];
    questele.textContent=current.question;

    current.options.forEach(options =>{
        const btn=document.createElement("button");
        btn.textContent=options;
        btn.addEventListener("click",() =>{
            selectAnswer(btn,current.answer);
        });
        optionele.appendChild(btn);
    });
}

function selectAnswer(button,correctAnswer)
{
    const isCorrect=button.textContent===correctAnswer;
    if(isCorrect)
    {
        button.classList.add("correct");
        score++;
    }
    else{
        button.classList.add("wrong");
    }

    Array.from(optionele.children).forEach(btn=>{
        btn.disabled=true;
        if(btn.textContent===correctAnswer)
        {
            btn.classList.add("correct");
        }
    });

    nextbtn.style.display="block";
}

function resetState(){
    nextbtn.style.display="none";
    optionele.innerHTML="";
}

nextbtn.addEventListener("click",()=>{
    curidx++;
    if(curidx<questions.length)
    {
        loadQuestion();
    }
    else{
        showResult();
    }
});

function showResult(){
    document.getElementById("quiz").classList.add("hide");
    resultEl.classList.remove("hide");
    scoreEl.textContent=`${score} / ${questions.length}`;
}

loadQuestion();