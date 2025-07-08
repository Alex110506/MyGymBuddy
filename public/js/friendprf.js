import { trainingPlans } from "./workouplans.js";
function getData(){
    return fetch('/getFrData')
        .then(response=>response.json())
        .then(data=>{
            if(data[0].image==null){
                document.querySelector('.prf-img').src=`/icons/blank.png`;
            }
            else{
                document.querySelector('.prf-img').src=`/prfimgs/${data[0].image}`;
            }
            document.querySelector('.username').innerHTML=data[0].user
            document.querySelector('.username-cont').innerHTML=data[0].user;
            document.querySelector('.wei-inp').innerHTML=data[0].todayBw;
            document.querySelector('.cal-inp').innerHTML=data[0].calGoal;
            document.querySelector('.fr-nr').innerHTML=data[0].nrFriends.toString();
            document.querySelector('.frName-sync').value=data[0].user;
            const wdiff=Math.abs(data[0].startW-data[0].goalW);
            const cVals=[Number(data[0].cmon),Number(data[0].ctue),Number(data[0].cwed),Number(data[0].cthu),Number(data[0].cfri),Number(data[0].csat),Number(data[0].csun)];
            const wVals=[Number(data[0].mon),Number(data[0].tue),Number(data[0].wed),Number(data[0].thu),Number(data[0].fri),Number(data[0].sat),Number(data[0].sun)]
            const day=['mon','tue','wed','thu','fri','sat','sun'];
            for(let i=0 ; i<7 ; i++){
                let pdiff=0;
                if(wVals[i]==0){
                    pdiff=0;
                }else{  
                    const percdiff=Math.abs(data[0].startW-wVals[i]);
                    pdiff=Math.round(Number(100*percdiff/wdiff)*100)/100;
                }
                const cperc=Math.round(Number(cVals[i]*100/data[0].calGoal)*100)/100
                
                document.querySelector(`.${day[i]}-cal`).style.height=`${cperc}%`
                document.querySelector(`.${day[i]}-wei`).style.height=`${pdiff}%`
            }
            const wrkType=Number(data[0].wrkId);
            let wrkName=''
            let wrkTp=0;
            if(wrkType==0)
                wrkName='No Workout Plan'
            if(wrkType>=1 && wrkType<6){
                wrkName='Strength'
                wrkTp=0;
            }
            if(wrkType>=6 && wrkType<11){
                wrkName='Endurance'
                wrkTp=1;
            }
            if(wrkType>=11 && wrkType<16){
                wrkName='Muscle Building'
                wrkTp=2
            }
            if(wrkType>=16 && wrkType<21){
                wrkName='Losing Weight'
                wrkTp=3
            }
            
            document.querySelector('.wrk-type-p').innerHTML=wrkName
            if(data[0].wrkId>=1){
                const dayHash=data[0].wrkDays;
                const wrkPlan=trainingPlans[wrkTp].plans[wrkType-(wrkTp)*5-1].exercises
                let index=0;
                let wrkDay;
                let html='';
                const dayWord=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
                let htmll='';
                for(let i=0 ; i<7 ; i++){
                    htmll='';
                    html='';
                    if(dayHash.at(i)=='1'){
                        wrkDay=wrkPlan[index++].exercises;
                        html+=`<div class>`
                        wrkDay.forEach(item=>{
                            html+=`
                                <div class='gen-ex-cont'>
                                    <h3>${item.exerciseName}</h3>
                                    <p>${item.sets}</p>
                                </div>
                            `
                        })
                        htmll=`
                            <div class='gen-day-cont'>
                                <h2>${dayWord[i]}</h2>
                                ${html}
                            </div>
                        `
                    }
                    else{
                        htmll=`
                            <div class='gen-day-cont'>
                                <h2>${dayWord[i]}</h2>
                                <div class='gen-ex-cont'>
                                    <h3>Rest Day</h3>
                                </div>
                            </div>
                        `
                    }
                    document.querySelector('.wrk-cont').innerHTML+=htmll;
                }
            }
            let proPerc=0,fatPerc=0,carbPerc=0;
            const dietType=data[0].dietType;
            if(dietType==='balanced')
                carbPerc=40,proPerc=30,fatPerc=30;
            if(dietType==='keto')
                carbPerc=5,proPerc=25,fatPerc=70;
            if(dietType==='highpro')
                carbPerc=30,proPerc=50,fatPerc=20;
            if(dietType==='lowcarb')
                carbPerc=20,proPerc=40,fatPerc=40;
            if(dietType==='vegan')
                carbPerc=50,proPerc=25,fatPerc=25;
            if(dietType==='carnivore')
                carbPerc=0,proPerc=40,fatPerc=60;

            let totalpro=Math.round(data[0].calGoal*proPerc/100/4);
            let totalcarb=Math.round(data[0].calGoal*carbPerc/100/4);
            let totalfat=Math.round(data[0].calGoal*fatPerc/100/9);
            document.querySelector('.pro-inp').innerHTML=totalpro.toString();
            document.querySelector('.carb-inp').innerHTML=totalcarb.toString();
            document.querySelector('.fat-inp').innerHTML=totalfat.toString();
        })
}

let commonFrs=[];

function getCommonFriends(){
    return fetch('/mutualFrs')
        .then(response=>response.json())
        .then(data=>{
            const user1=data[1];
            const user2=data[2];
            const frArr=data[0];
            for(let i=0 ; i<frArr[0].length ; i++){
                for(let j=0 ; j<frArr[1].length ; j++){
                    if(frArr[0][i].status=='accepted' && frArr[1][j].status=='accepted'){
                        let commonfr1='',commonfr2='',commonfr='';
                        if(frArr[0][i].requester===user1)
                            commonfr1=frArr[0][i].reciver;
                        else 
                            commonfr1=frArr[0][i].requester;

                        if(frArr[1][j].requester===user2)
                            commonfr2=frArr[1][j].reciver;
                        else 
                            commonfr2=frArr[1][j].requester;

                        if(commonfr1===commonfr2) commonFrs.push(commonfr1);
                    }
                }
            }
            let html='';
            commonFrs.forEach(item=>{
                html+=`
                    <div class='comm-fr-cont'>
                        <img src='/icons/blank.png'>
                        <h2>${item}</h2>
                    </div>
                `
            })
            document.querySelector('.common-cont').innerHTML=html;
        })
}

getData().then(data=>getCommonFriends());