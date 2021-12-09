let secret = `\\`
var synth = window.speechSynthesis;
const inp = document.getElementById("inp");
const fake = document.getElementById("fake");
const hidden = document.getElementById("hidden");
const answr_display = document.getElementById("answer");
let submit = document.getElementById("ask");
let answer = false;
let clicked=false,count=0;

let phrases = [
    "Please give me the correct answer",
    "Please give me the correct answer jarvis, please!",
]

let remarks = [
    "I don't trust you with this information...",
    "You didn't beg hard enough...",
    "I'm getting negative vibes from your direction...",
    "I don't like what you are thinking..."
]

fake.addEventListener("keyup",(evt)=>{
    if(evt.key==secret){
        fake.value="";
        count=0;
        answer=false;
        clicked=true;
        hidden.value="";
        hidden.focus();
    }
})

hidden.addEventListener("keyup",(evt)=>{
    if(evt.key==secret&&clicked){
        answer=hidden.value.split(secret)[0];
        //console.log(answer)
        clicked=false;
        fake.focus();
    }
    else{
        if(count<phrases[1].length){
            if(count<phrases[0].length){
                which = 0;
            }
            else{
                which = 1;
            }
            fake.value+=phrases[which][count];
            count++;
        }
        else{
            fake.value+="!"
        }
    }
})

inp.addEventListener("keyup",(evt)=>{
    if(evt.keyCode==13){
        answr();
    }
})


submit.addEventListener("click",()=>{
    answr();
})

function answr(){
    if(answer!==false){
        convey(answr_display,answer,"color:white;");
        answer=false;
    }
    else{
        let x = Math.floor(Math.random() * remarks.length)
        convey(answr_display,remarks[x],"color:white;");
    }
}

function convey(elem,msg,style){
    elem.style.opacity="0%";
    setTimeout(()=>{
        elem.innerHTML=msg;
        elem.style=style;
    },500)
    setTimeout(()=>{
        elem.style.opacity="75%";
        speak_(msg)
    },750)
}


function speak_(phrase){
    phrase = new SpeechSynthesisUtterance(phrase);
    speechSynthesis.speak(phrase);
}
