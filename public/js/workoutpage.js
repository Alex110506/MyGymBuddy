let caloriesBurnedTd;
let setsTd;
let minsTd;
let exOfToday=[];
let wrkid=0;
let wrkday='';
import { exercises, flexibilityExercises, cardioExercises } from "./exerciselist.js";
import { trainingPlans } from "./workouplans.js";
function fetchExercise(){
   return fetch('/exercise')
      .then(response=>response.json())
      .then(data=>{
         for(let i=0 ; i<data.length ; i++){
            let val='';
            if(data[i].type===1)
               val=`${data[i].sets} sets`;
            else{
               val=`${data[i].sets} minutes` //////////////////
            }
            let thisObj={
               name:data[i].name.toString(),
               cal:data[i].cals.toString(),
               type:data[i].type,
               dur:val
            };
            exOfToday.push(thisObj);
         }
      })
      .catch(err=>console.log(err));
}

function fetchData(){
   return fetch('/data')
      .then(response=>response.json())
      .then(data=>{
         document.querySelector('.burned-cal').value=data[0].burned
         document.querySelector('.nr-sets').value=data[0].nrSets
         document.querySelector('.nr-mins').value=data[0].nrMins
         document.querySelector('.wrk-id').value=data[0].wrkId;
         wrkid=Number(data[0].wrkId)
         document.querySelector('.wrk-days').value=data[0].wrkDays;
         wrkday=data[0].wrkDays
         caloriesBurnedTd=data[0].burned
         minsTd=data[0].nrMins
         setsTd=data[0].nrSets
       //  fetchExercise();
      })
      .catch(err=>console.log(err))
}



function appRun(){

let StrengthBtn=document.getElementById("str-btn");
let FlexibilityBtn=document.getElementById("flex-btn");
let CardioBtn=document.getElementById("car-btn");
let hoverBtn=document.getElementById("btn");

let armsBtn=document.getElementById("arms");
let chestBtn=document.getElementById("chest");
let backBtn=document.getElementById("back");
let legsBtn=document.getElementById("legs");
let absBtn=document.getElementById("abs");
let hoverBtn1=document.getElementById("btn1");
let strengthSelector=document.querySelector(".str-selector");

let fastBtn=document.getElementById("fast");
let slowBtn=document.getElementById("slow");
let hoverBtn2=document.getElementById("btn2");
let cardioSelector=document.querySelector(".car-selector");

let exNameTitle=document.querySelector(".exercise-name");
let caloriesBurnedNr=document.getElementById("cals");
let caloriesBurnedTxt=document.getElementById("unit");
let Qinput=document.querySelector(".number-of");
let exInfo=document.querySelector(".ex-info");
let exType=document.querySelector('.extype');

let addBtn=document.querySelector('.add-btn');
let todayList=document.querySelector('.today-list');


let exerciseSpace=document.querySelector(".exercise-space");

function renderPlan(){
   const date= new Date();
   var today=date.getDay()-1;
   let html=''
   let whichDay=0;
   
   if(today===-1) today=6;
   for(let i=0 ; i<=today ; i++){
      if(wrkday.at(i)==='1') whichDay++;
   }
   if(wrkday.at(today)==='0'){
      html=`
         <h2>Today is a Rest Day</h2>
      `
      document.querySelector('.ex-cont').innerHTML=html;
   }else{
      let ii,jj;
      for(let i=0 ; i<4 ; i++){
         for(let j=0 ; j<5 ; j++){
            if(trainingPlans[i].plans[j].workoutId===wrkid)
               ii=i,jj=j;
         }
      }
      trainingPlans[ii].plans[jj].exercises[whichDay-1].exercises.forEach((item)=>{
         html+=`
            <div class='ex-form-plan'>
               <div class='ex-form-vals'>
                  <h3 id='ex-plan-name'>${item.exerciseName}</h3>
                  <p>${item.sets} sets</p>
               </div>
               <div class='ex-form-btn'>
                  <button type='button' class='ex-form-btnn'
                  data-name='${item.exerciseName}'
                  data-sets='${item.sets}' 
                  >+</button>
               </div>
            </div>
         `
      }) 
      document.querySelector('.ex-cont').innerHTML=html;
      document.querySelectorAll('.ex-form-btnn').forEach((button)=>{
         button.addEventListener('click',()=>{
            const {name,sets}=button.dataset;
            let type=0;
            let cals=0;
            let info='';
            exercises.forEach(item=>{
               if(item.name.toLowerCase()===name.toLowerCase())
                  type=1,cals=Number(item.setcal),info=item.info
            })
            cardioExercises.forEach(item=>{
               if(item.name.toLowerCase()===name.toLowerCase())
                  type=2,cals=Number(item.mincal),info=item.info
            })
            flexibilityExercises.forEach(item=>{
               if(item.name.toLowerCase()===name.toLowerCase())
                  type=2,cals=Number(item.mincal),info=item.info
            })
            const img=''
            showData(name,cals,img,type,info);
            Qinput.value=Number(sets);
         })
      })
   }
}
if(wrkid!==0){
   renderPlan()
}else{
   document.querySelector('.ex-cont').innerHTML=`
      <h2>No Workout Plan!</h2>
      <h3>Do you want to create one?</h3>
      <a href='/goals' class='create-wrk'><button type='button'>Create a Plan!</button></a>
   `;
}

/*let exOfToday=[];
if(localStorage.getItem('exOfToday')===null)
   exOfToday=[];
else
   exOfToday=JSON.parse(localStorage.getItem('exOfToday')); */

StrengthBtn.addEventListener('click',()=>{
   hoverBtn.style.left="0px";
   strengthSelector.style.top="140px";
   cardioSelector.style.top="20px";
   let html="";
   exerciseSpace.style.paddingTop="100px";
   exerciseSpace.innerHTML="";
   armsBtn.addEventListener('click',()=>{
      html="";
      exercises.forEach((item)=>{
         if(item.extype==="arms"){
            html+=
            `
               <div class="exercise-unit">
                  <img class="da" src="../icons/curl.png">
                  <div class="exercise-info-felx">
                     <div class="st-name">
                        ${item.name}
                     </div>
                     <div class="targeted">
                        ${item.setcal} kcal burned per set
                     </div>
                  </div>
                  <button class="add-exercise-btn"
                     data-name="${item.name}"
                     data-cal="${item.setcal}"
                     data-imag="${item.imag}"
                     data-extype="1"
                     data-info="${item.info}"
                  >+</button>
               </div>
            `
         }
      })
      exerciseSpace.innerHTML=html;
      document.querySelectorAll('.add-exercise-btn').forEach((button)=>{
         button.addEventListener('click',()=>{
            showData(button.dataset.name,button.dataset.cal,button.dataset.imag,button.dataset.extype,button.dataset.info);
         })
      })
      
   })
   backBtn.addEventListener('click',()=>{
      html="";
      exercises.forEach((item)=>{
         if(item.extype==="back"){
            html+=
            `
               <div class="exercise-unit">
                  <img class="da" src="../icons/back.png">
                  <div class="exercise-info-felx">
                     <div class="st-name">
                        ${item.name}
                     </div>
                     <div class="targeted">
                        ${item.setcal} kcal burned per set
                     </div>
                  </div>
                  <button class="add-exercise-btn"
                     data-name="${item.name}"
                     data-cal="${item.setcal}"
                     data-imag="${item.imag}"
                     data-extype="1"
                     data-info="${item.info}"
                  >+</button>
               </div>
            `
         }
      })
      exerciseSpace.innerHTML=html;
      document.querySelectorAll('.add-exercise-btn').forEach((button)=>{
         button.addEventListener('click',()=>{
            showData(button.dataset.name,button.dataset.cal,button.dataset.imag,button.dataset.extype,button.dataset.info);
         })
      })
   })
   chestBtn.addEventListener('click',()=>{
      html="";
      exercises.forEach((item)=>{
         if(item.extype==="chest"){
            html+=
            `
               <div class="exercise-unit">
                  <img class="da" src="../icons/pecs.png">
                  <div class="exercise-info-felx">
                     <div class="st-name">
                        ${item.name}
                     </div>
                     <div class="targeted">
                        ${item.setcal} kcal burned per set
                     </div>
                  </div>
                  <button class="add-exercise-btn"
                     data-name="${item.name}"
                     data-cal="${item.setcal}"
                     data-imag="${item.imag}"
                     data-extype="1"         
                     data-info="${item.info}"         
                  >+</button>
               </div>
            `
         }
      })
      exerciseSpace.innerHTML=html;
      document.querySelectorAll('.add-exercise-btn').forEach((button)=>{
         button.addEventListener('click',()=>{
            showData(button.dataset.name,button.dataset.cal,button.dataset.imag,button.dataset.extype,button.dataset.info);
         })
      })
   })
   legsBtn.addEventListener('click',()=>{
      html="";
      exercises.forEach((item)=>{
         if(item.extype==="legs"){
            html+=
            `
               <div class="exercise-unit">
                  <img class="da" src="../icons/legs.png">
                  <div class="exercise-info-felx">
                     <div class="st-name">
                        ${item.name}
                     </div>
                     <div class="targeted">
                        ${item.setcal} kcal burned per set
                     </div>
                  </div>
                  <button class="add-exercise-btn"
                     data-name="${item.name}"
                     data-cal="${item.setcal}"
                     data-imag="${item.imag}"
                     data-extype="1"        
                     data-info="${item.info}"          
                  >+</button>
               </div>
            `
         }
      })
      exerciseSpace.innerHTML=html;
      document.querySelectorAll('.add-exercise-btn').forEach((button)=>{
         button.addEventListener('click',()=>{
            showData(button.dataset.name,button.dataset.cal,button.dataset.imag,button.dataset.extype,button.dataset.info);
         })
      })
   })
   absBtn.addEventListener('click',()=>{
      html="";
      exercises.forEach((item)=>{
         if(item.extype==="abs"){
            html+=
            `
               <div class="exercise-unit">
                  <img class="da" src="../icons/abs.png">
                  <div class="exercise-info-felx">
                     <div class="st-name">
                        ${item.name}
                     </div>
                     <div class="targeted">
                        ${item.setcal} kcal burned per set
                     </div>
                  </div>
                  <button class="add-exercise-btn"
                     data-name="${item.name}"
                     data-cal="${item.setcal}"
                     data-imag="${item.imag}"
                     data-extype="1"
                     data-info="${item.info}"
                  >+</button>
               </div>
            `
         }
      })
      exerciseSpace.innerHTML=html;
      document.querySelectorAll('.add-exercise-btn').forEach((button)=>{
         button.addEventListener('click',()=>{
            showData(button.dataset.name,button.dataset.cal,button.dataset.imag,button.dataset.extype,button.dataset.info);
         })
      })
   })
});
CardioBtn.addEventListener('click',()=>{
   hoverBtn.style.left="438px";
   strengthSelector.style.top="20px";
   cardioSelector.style.top="140px";
   let html="";
   exerciseSpace.style.paddingTop="100px";
   exerciseSpace.innerHTML="";
   fastBtn.addEventListener('click',()=>{
      html="";
      cardioExercises.forEach((item)=>{
         if(item.extype==="fast-paced"){
            html+=
            `
               <div class="exercise-unit">
                  <img id="da1" src="../icons/rope.png">
                  <div class="exercise-info-felx">
                     <div class="st-name">
                        ${item.name}
                     </div>
                     <div class="targeted">
                        ${item.mincal} kcal burned per minute
                     </div>
                  </div>
                  <button class="add-exercise-btn"
                     data-name="${item.name}"
                     data-cal="${item.mincal}"
                     data-imag="${item.imag}"
                     data-extype="2"
                  >+</button>
               </div>
            `
         } 
      })
      exerciseSpace.innerHTML=html;
      document.querySelectorAll('.add-exercise-btn').forEach((button)=>{
         button.addEventListener('click',()=>{
            showData(button.dataset.name,button.dataset.cal,button.dataset.imag,button.dataset.extype);
         })
      })
   })
   slowBtn.addEventListener('click',()=>{
      html="";
      cardioExercises.forEach((item)=>{
         if(item.extype==="slow-paced"){
            html+=
            `
               <div class="exercise-unit">
                  <img id="da1" src="../icons/cardioicon.png">
                  <div class="exercise-info-felx">
                     <div class="st-name">
                        ${item.name}
                     </div>
                     <div class="targeted">
                        ${item.mincal} kcal burned per minute
                     </div>
                  </div>
                  <button class="add-exercise-btn"
                     data-name="${item.name}"
                     data-cal="${item.mincal}"
                     data-imag="${item.imag}"
                     data-extype="2"
                  >+</button>
               </div>
            `
         } 
      })
      exerciseSpace.innerHTML=html;
      document.querySelectorAll('.add-exercise-btn').forEach((button)=>{
         button.addEventListener('click',()=>{
            showData(button.dataset.name,button.dataset.cal,button.dataset.imag,button.dataset.extype);
         })
      })
   })
   
});
FlexibilityBtn.addEventListener('click',()=>{
   hoverBtn.style.left="219px";
   strengthSelector.style.top="20px";
   cardioSelector.style.top="20px";
   let html="";
   exerciseSpace.innerHTML="";
   exerciseSpace.style.paddingTop="20px";
   flexibilityExercises.forEach((item)=>{
      html+=
      `
         <div class="exercise-unit">
            <img id="da1" src="../icons/flex.png">
            <div class="exercise-info-felx">
               <div class="st-name">
                  ${item.name}
               </div>
               <div class="targeted">
                  ${item.parts}
               </div>
            </div>
            <button class="add-exercise-btn"
               data-name="${item.name}"
               data-cal="${item.mincal}"
               data-imag="${item.imag}"
               data-extype="3"
            >+</button>
         </div>
      `
   })
   exerciseSpace.innerHTML=html;
   document.querySelectorAll('.add-exercise-btn').forEach((button)=>{
      button.addEventListener('click',()=>{
         showData(button.dataset.name,button.dataset.cal,button.dataset.imag,button.dataset.extype);
      })
   })
})





armsBtn.addEventListener('click',()=>{
   hoverBtn1.style.left="0px";
})
chestBtn.addEventListener('click',()=>{
   hoverBtn1.style.left="120px";
})
backBtn.addEventListener('click',()=>{
   hoverBtn1.style.left="240px";
})
legsBtn.addEventListener('click',()=>{
   hoverBtn1.style.left="360px";
})
absBtn.addEventListener('click',()=>{
   hoverBtn1.style.left="480px";
})

fastBtn.addEventListener('click',()=>{
   hoverBtn2.style.left="0px";
})
slowBtn.addEventListener('click',()=>{
   hoverBtn2.style.left="300px";
})



function OnLoad(){
   const date= new Date();
   var today=date.getDay()+1;
   var savedDay=Number(JSON.parse(localStorage.getItem('savedDay1')));
   if(savedDay!=today){
      savedDay=today;
      //caloriesBurnedTd=0;
     // minsTd=0;
      //setsTd=0;
      //localStorage.setItem('minsTd',minsTd);
      //localStorage.setItem('setsTd',setsTd);
     // localStorage.setItem('caloriesBurnedTd',caloriesBurnedTd);
      //localStorage.removeItem('exOfToday');
      localStorage.setItem('savedDay1',JSON.stringify(savedDay));
   }
}

window.onload=OnLoad();

function showData(name,cals,img,type,info){
   exNameTitle.value=`${name}`;
   exNameTitle.style.color="white";
   if(type==="1")
      caloriesBurnedTxt.innerHTML=`/set`;
   else
      caloriesBurnedTxt.innerHTML=`/min`;
   exInfo.innerHTML=`${info}`;
   exInfo.style.color="white";
   exInfo.style.paddingTop="10px";
   exInfo.style.fontSize="30px";
   if(window.innerWidth<1200) exInfo.style.fontSize="3vw";
   exType.value=`${type}`
   const calos=Number(cals);
   
   caloriesBurnedNr.value=`${calos} kcal`;
   Qinput.addEventListener('keydown',(e)=>{
      if(e.code==="Enter"){
         const quantity=Number(Qinput.value);
         caloriesBurnedNr.value=`${calos*quantity} kcal`;
         caloriesBurnedTxt.innerHTML=`on this exercise`;
      }
   })
}
let exname,excal,extype,exdur;
addBtn.addEventListener('click',()=>{
   if(exNameTitle.value=="")
      alert("Please select an exercise!");
   else{
      if(Qinput.value=="")
         alert("Please insert the duration of the exercise!");
      else{
         exname=exNameTitle.value;
         const myarr=caloriesBurnedNr.value.split(" ");
         const nrcal=Number(myarr[0]);
         const myarr1=caloriesBurnedTxt.innerHTML.split(" ");
         if(myarr1[0]=="on")
            excal=`${nrcal}`;
         else
            excal=`${nrcal*Number(Qinput.value)}`;
         if(exType.value=="1")
            extype=1,exdur=`${Qinput.value} sets`;
         else
            extype=2,exdur=`${Qinput.value} minutes`;
        // let thisObj={name:exname,cal:excal,type:extype,dur:exdur};
         //exOfToday.push(thisObj);
        // localStorage.setItem('exOfToday',JSON.stringify(exOfToday))
         showToday();
      }
   }
})



function showToday(){
   let html='';
   let sNr=0;
   let mNr=0;
   const arr=[1,2,3];

   exOfToday.forEach((item)=>{
      let s=item.dur.split(" ");
      const dur=s[0];
      const durtxt=s[1];
      if(item.type===1)
         sNr+=Number(dur);
      else
         mNr+=Number(dur);
      html+=`
         <div class="ex-in-list">
            <div class="main-info">
               <div class="td-name">
                  ${item.name}
               </div>
               <div class="td-cal">
                  ${item.cal} kcal
               </div>
            </div>
            <div class="td-dur">
               <div class="durnr">
                  ${dur}
               </div>
               <div class="typedur">${durtxt}</div>
            </div>
         </div>
      `
      
   })
   let calBurBar=document.querySelector('.calmet-bar-prog');
   let calMetNr=document.querySelector('.calmet-nr');
   let progMsg=document.querySelector('.did-it');
   var calsBrd=Number(caloriesBurnedTd);
   var percBur=Number((100*calsBrd)/500);
   calMetNr.innerHTML=`${caloriesBurnedTd}/500 kcal`
   if(percBur>100){
      calBurBar.style.width=`100%`;
   }
   else{
      calBurBar.style.width=`${percBur}%`
   }
   if(percBur>100){
      calBurBar.style.backgroundColor="rgb(0, 128, 11)";
      progMsg.innerHTML="Congratulations! You have completed your goal!"
   }
   if(percBur>66 && percBur<=100){
      calBurBar.style.backgroundColor="rgb(145, 255, 0)";
   }
   if(percBur>33 && percBur<=66){
      calBurBar.style.backgroundColor="rgb(255, 238, 0)";
   }
   if(percBur>=0 && percBur<33){
      calBurBar.style.backgroundColor="rgb(252, 34, 34)";
   }
   //caloriesBurnedTd=calNr;
   setsTd=sNr;
   minsTd=mNr;
   localStorage.setItem('setsTd',setsTd);
   localStorage.setItem('minsTd',minsTd);
  // localStorage.setItem('caloriesBurnedTd',caloriesBurnedTd);
   todayList.innerHTML=html;
   
} 

showToday();
}

fetchData().then(data=>fetchExercise().then(data=>appRun()))


