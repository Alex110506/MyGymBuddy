import {trainingPlans} from './workouplans.js'

function fetchData(){
    return fetch('/data')
        .then(response=>response.json())
        .then(data=>{
            document.querySelector('.cal-res').placeholder=`previous intake: ${data[0].calGoal}kcal`
            document.querySelector('.user-goal-wei').innerHTML=data[0].goalW
            document.querySelector('.user-start-wei').innerHTML=data[0].startW
            document.querySelector('.user-gender').innerHTML=2;
        })
        .catch(error=>console.log(error))
}
function appRun(){
    let calcBtn=document.querySelector('.calc-btn');
    let resultcalc=document.querySelector('.cal-res');
    calcBtn.addEventListener('click',()=>{
        const stW=document.querySelector('.stw-input').value
        const glW=document.querySelector('.glw-input').value
        const goal=Number(document.querySelector('.goalsel').value)
        const hei=document.querySelector('.hei-input').value
        const age=document.querySelector('.age-input').value
        const acti=Number(document.querySelector('.actsel').value);
        const gender=Number(document.querySelector('.user-gender').innerHTML);
        const dietType=document.querySelector('.diet-type-sel').value
        if(stW===0 || glW===0 || goal===0 || hei===0 || age===0|| acti===0){
            alert('Please fill in all inputs')
        }else{
            let res=0;
            if(gender===2)
                res=10*stW+6.25*hei-5*age+5;
            if(gender===3)
                res=10*stW+6.25*hei-5*age+5-161;
            if(acti===2){
                res*=1.2
            }
            if(acti===3){
                res*=1.375
            }
            if(acti===4){
                res*=1.55
            }
            if(acti===5){
                res*=1.9
            }
            if(goal===2)
                res-=300;
            if(goal===4)
                res+=300
            res=Math.round(res)
            resultcalc.value=res.toString()+' Kcal/day'
            let bmiRes=stW/(hei*hei)*10000;
            let message='';
            if(bmiRes<13.5)
                message='Severe Thinness'
            if(bmiRes>=13.5 && bmiRes<15)
                message='Moderate Thinness'
            if(bmiRes>=15 && bmiRes<17.2)
                message='Mild Thinness'
            if(bmiRes>=17.2 && bmiRes<24)
                message='Normal'
            if(bmiRes>=24 && bmiRes<29.7)
                message='Overweight'
            if(bmiRes>=29.7 && bmiRes<34.5)
                message='Obese Class I'
            if(bmiRes>=34.5 && bmiRes<40.7)
                message='Obese Class II'
            if(bmiRes>=40.7)
                message='Obese Class III'
            bmiRes=Math.round(bmiRes*100)/100;
            document.querySelector('.bmi-input').value=`BMI: ${bmiRes} (${message})`
            let deg=(bmiRes-10)*180/35;
            if(deg<0 || deg>180)
                deg=0;
            const needle=document.querySelector('.needle');
            needle.style.transform=`rotate(${deg}deg)`
            document.querySelector('.stw-form').value=stW.toString()
            document.querySelector('.glw-form').value=glW.toString()
            document.querySelector('.cal-form').value=res.toString()
            document.querySelector('.type-form').value=dietType.toString();
        }
    })

let genWrk=document.querySelector('.create-btn');
let nrDays=0;
let days=[0,0,0,0,0,0,0];
let dayStr=''
let daysName=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
document.querySelectorAll('.chk').forEach((box,index)=>{
    box.addEventListener('change',()=>{
        if(box.checked===true)
            nrDays++,days[index]=1;
        else{
            nrDays--,days[index]=0;
        }
    })
})
genWrk.addEventListener('click',()=>{
    //algoritm de generare a antrenamentului si hasing pentru stocarea eficienta in baza de date
    //hash creat utilizand tipul de antrenament si zilele in care se antreneaza utilizatorul
    let typeSel=Number(document.querySelector('.type-sel').value)-1;
    let durSel=Number(document.querySelector('.dur-sel').value)-1;
    const trplan=trainingPlans[typeSel].plans[5-nrDays]
    let html='';
    let index=0;
    let htmlEl=''
    for(let i=0 ; i<7 ; i++){
        if(days[i]===1){
            dayStr+='1'
            trplan.exercises[index].exercises.forEach(item=>{
                htmlEl+= `
                    <div class='gen-ex-cont'>
                        <h3>${item.exerciseName}</h3>
                        <p>${item.sets} sets</p>
                    </div>
                `
            })
            html+=`
                <div class='gen-day-cont'>
                    <h2>${daysName[i]}</h2>
                    ${htmlEl}
                </div>
            `
            htmlEl=''
            index++;
        }
        else{
            dayStr+='0'
            html+=`
                <div class='gen-day-cont'>
                    <h2>${daysName[i]}</h2>
                    <div class='gen-ex-cont'>
                        <h3>Rest Day</h3>
                    </div>
                </div>
            `
        }
    }
    document.querySelector('.user-wrk-inps').style.position='absolute'
    document.querySelector('.user-wrk-inps').style.visibility='hidden'
    document.querySelector('.generated').style.position='relative'
    document.querySelector('.generated').style.visibility='visible'
    document.querySelector('.add-wrk-plan').style.position='relative'
    document.querySelector('.add-wrk-plan').style.visibility='visible'
    document.querySelector('.wrk-id').value=trplan.workoutId;
    document.querySelector('.days-id').value=dayStr;
    document.querySelector('.generated').innerHTML=html;
})
}


fetchData().then(data=>appRun())