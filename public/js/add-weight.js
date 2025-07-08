let caloriesOfToday=0//Number(JSON.parse(localStorage.getItem('caloriesOfToday')));
let proOfToday=0//Number(JSON.parse(localStorage.getItem('proOfToday')));
let carbOfToday=0//Number(JSON.parse(localStorage.getItem('carbOfToday')));
let fatOfToday=0//Number(JSON.parse(localStorage.getItem('fatOfToday')));
let proPerc=0,fatPerc=0,carbPerc=0;

let friends=[]
function fetchFriends(){
   return fetch('/getfriends')
      .then(response=>response.json())
      .then(data=>{
         const username=document.getElementById('userNameCont').innerHTML
         if(data!=false){
            for(let i=0 ; i<data.length ; i++){
               if(data[i].reciver===username)
                  friends.push(data[i].requester.toString());
               else{
                  friends.push(data[i].reciver.toString());
               }
            }
         }else{
            document.querySelector('.friends-list').innerHTML+=
            `
            <div class='not-found-cont'>
               <img class='not-found-img' src='/icons/search.png'>   
               <h1 class='not-found-msg'>No friends were found!</h1>
               <button class='not-found-btn'>Click here to add</button>
            </div>
            `
         }
      })
}

function fetchData(){
   return fetch('/data')
      .then(response=>response.json())
      .then(data=>{
         //document.getElementById('user-infos').innerHTML=data
         document.getElementById('userNameCont').innerHTML=data[0].user
         document.querySelector('.user-cals').innerHTML=data[0].calGoal
         document.querySelector('.goal-cals').innerHTML=data[0].calGoal;
         document.querySelector('.user-goal-wei').innerHTML=data[0].goalW
         document.querySelector('.user-start-wei').innerHTML=data[0].startW
         document.querySelector('.user-curr-wei').innerHTML=data[0].todayBw
         document.querySelector('.mon').innerHTML=data[0].mon;
         document.querySelector('.tue').innerHTML=data[0].tue;
         document.querySelector('.wed').innerHTML=data[0].wed;
         document.querySelector('.thu').innerHTML=data[0].thu;
         document.querySelector('.fri').innerHTML=data[0].fri;
         document.querySelector('.sat').innerHTML=data[0].sat;
         document.querySelector('.sun').innerHTML=data[0].sun;

         document.querySelector('.monc').innerHTML=data[0].cmon;
         document.querySelector('.tuec').innerHTML=data[0].ctue;
         document.querySelector('.wedc').innerHTML=data[0].cwed;
         document.querySelector('.thuc').innerHTML=data[0].cthu;
         document.querySelector('.fric').innerHTML=data[0].cfri;
         document.querySelector('.satc').innerHTML=data[0].csat;
         document.querySelector('.sunc').innerHTML=data[0].csun;

         document.querySelector('.user-curr-burned').innerHTML=data[0].burned;
         document.querySelector('.user-curr-sets').innerHTML=data[0].nrSets
         document.querySelector('.user-curr-mins').innerHTML=data[0].nrMins

         document.querySelector('.user-curr-cal').innerHTML=data[0].todayCal;
         caloriesOfToday=data[0].todayCal
         document.querySelector('.user-curr-pro').innerHTML=data[0].tdPro;
         proOfToday=data[0].tdPro
         document.querySelector('.user-curr-fat').innerHTML=data[0].tdFat;
         fatOfToday=data[0].tdFat
         document.querySelector('.user-curr-carb').innerHTML=data[0].tdCarb;
         carbOfToday=data[0].tdFat
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
      })
      .catch(error=>console.log(error))
}

function appRun(){

let searchFriend=document.querySelector('.search-friend');
searchFriend.addEventListener('keydown',(e)=>{
   if(e.code==='Enter'){
      const searchInp=searchFriend.value
      const newArr=friends.filter(item=>item.toLowerCase().includes(searchInp.toLowerCase())===true)
      document.querySelector('.friends-list').innerHTML=''
      newArr.forEach((item)=>{
         let html=`
            <div class='friend-cont'>
               <img class='friend-img' src='/icons/blank.png'>
               <span class='friend-name'>${item}</span>
               <button class='message-friend'>
                  <img src='/icons/send.png'>
               </button>
            </div>
         `
         document.querySelector('.friends-list').innerHTML+=html;
      })
      if(newArr.length===0){
         document.querySelector('.friends-list').innerHTML+=
            `
            <div class='not-found-cont'>
               <img class='not-found-img' src='/icons/search.png'>   
               <h1 class='not-found-msg'>No friends were found!</h1>
            </div>
            `
      }
   }
})


friends.forEach((item)=>{
   let html=`
      <div class='friend-cont'>
         <img class='friend-img' src='/icons/blank.png'>
         <a class='friend-name' href='/friendprf?name=${item}'>${item}</a>
         <button class='message-friend' data-name='${item}'>
            <img src='/icons/send.png'>
         </button>
      </div>
   `
   document.querySelector('.friends-list').innerHTML+=html;
})

let frName='',myUsername=document.getElementById('userNameCont').innerHTML
const socket=io();


document.querySelectorAll('.message-friend').forEach((button)=>{
   button.addEventListener('click',async function (){
      const {name}=button.dataset;

      document.querySelector('.message-cont').style.visibility='visible';
      document.querySelector('.message-cont').style.position='relative';
      document.querySelector('.friends1').style.visibility='hidden';
      document.querySelector('.friends1').style.position='absolute';
      document.querySelector('.fr-name-head').innerHTML=name;


      document.querySelector('.messages').innerHTML='';
      frName=name;
      let myRoom="";
      if(myUsername<frName)
         myRoom=myUsername+frName;
      else
         myRoom=frName+myUsername;      
      socket.emit('join room',{username:myUsername,room:myRoom})

      const msgData={
         usr1:myUsername,
         usr2:name
      }

      try{
         const response=await fetch('/getMessage',{
            method:'POST',
            headers:{
               'Content-Type':'application/json'
            },
            body:JSON.stringify(msgData)
         });
   
         if (!response.ok){
            throw new Error(`Server error:${response.statusText}`);
         }
         const data = await response.json();

         for(let i=0 ; i<data.length ; i++){
            const sender=data[i].sender;
            const reciver=data[i].reciver;
            const msg=data[i].message;
            const messages=document.querySelector('.messages');
            const messageElement=document.createElement('div');

            const usernameElement=document.createElement('div');
            usernameElement.classList.add('username-msg');
            if(myUsername!==sender)
               usernameElement.textContent=sender;
   
            messageElement.classList.add('message');
            messageElement.classList.add(sender===myUsername?'mine':'other');
            messageElement.textContent=msg;
   
            messages.appendChild(usernameElement);
            messages.appendChild(messageElement);
            messages.scrollTop=messages.scrollHeight;
         }

      }catch(error){
         console.log(error)
      }

   })
})

document.querySelector('.send-button').addEventListener('click',async function(){
   const msg=document.querySelector('.input-message');
   if(msg.value){
      //tansmitere socket catre backend cu mesajul
      socket.emit('chat message',msg.value);
      

      const reciver=document.querySelector('.fr-name-head').innerHTML;
      //apel la baza de date pt a salva mesajul
      const msgData={
         sender:myUsername,
         reciver:reciver,
         message:msg.value
      }

      try{
         const response=fetch('/addMessage',{
            method:'POST',
            headers:{
               'Content-Type':'application/json'
            },
            body:JSON.stringify(msgData)
         })
         if (!response.ok){
            throw new Error(`Server error:${response.statusText}`);
         }
         const data = await response.json();
      }catch (error){
         console.log(error);
      }
      msg.value='';
   }
})

socket.on('chat message',(msg)=>{
   //crearea unei componente de mesaj la primirea/trimiterea unuia
   const messages=document.querySelector('.messages');
   const messageElement=document.createElement('div');
   
   const usernameElement=document.createElement('div');
   usernameElement.classList.add('username-msg');
   if(myUsername!==msg.username)
      usernameElement.textContent=msg.username;

   messageElement.classList.add('message');
   messageElement.classList.add(msg.username===myUsername?'mine':'other');
   messageElement.textContent=msg.text;

   messages.appendChild(usernameElement);
   messages.appendChild(messageElement);
   messages.scrollTop=messages.scrollHeight;
})

document.querySelector('.back-btn').addEventListener('click',()=>{
   document.querySelector('.message-cont').style.visibility='hidden';
   document.querySelector('.message-cont').style.position='absolute';
   document.querySelector('.friends1').style.visibility='visible';
   document.querySelector('.friends1').style.position='relative';
})

let toGoWeight=document.querySelector('.togokg');
let toGoCals=document.querySelector('.togocals')
let caloriesBurnedTd=Number(document.querySelector('.user-curr-burned').innerHTML);
let setsTd=Number(document.querySelector('.user-curr-sets').innerHTML);
let minsTd=Number(document.querySelector('.user-curr-mins').innerHTML);
let burnedContainer=document.getElementById('burned-cals');
let setContainer=document.getElementById('nrsets');
let minContainer=document.getElementById('nrmins');
let calsIateTd=document.querySelector('.consumed-cals');

const GoalWeight=Number(document.querySelector('.user-goal-wei').innerHTML);
const StartWeight=Number(document.querySelector('.user-start-wei').innerHTML);


const weightCurrent=Number(document.querySelector('.user-curr-wei').innerHTML);
let CalorieLimit=Number(document.querySelector('.user-cals').innerHTML);
if(CalorieLimit==0)
   CalorieLimit=2500;
function setWeight(wgh){
   if(GoalWeight-wgh<0){
      toGoWeight.innerHTML=`${(Math.round((-GoalWeight+wgh)*10000))/10000} more kg to lose!`
   }
   else{
      toGoWeight.innerHTML=`${(Math.round((GoalWeight-wgh)*10000))/10000} more kg to gain!`
   }
}
setWeight(weightCurrent);

function setCals(cal){
   toGoCals.innerHTML=`${Math.round((CalorieLimit-cal)*10000)/10000} more calories to go!`
}

setCals(caloriesOfToday);


let numbercal=document.getElementById('calories-number');
let percentcal=document.querySelector('.circlecal');

function ShowPercentCal(perc){
   var style=getComputedStyle(percentcal);
   percentcal.style.strokeDashoffset=280-280*(perc/100);
   numbercal.innerHTML=Math.round(Number(perc))+"%";
}
var percc=100*caloriesOfToday/CalorieLimit;

ShowPercentCal(percc);

let probar=document.querySelector('.probar');
let fatbar=document.querySelector('.fatbar');
let carbbar=document.querySelector('.carbbar');
let programs=document.querySelector('.programs');
let fatgrams=document.querySelector('.fatgrams');
let carbgrams=document.querySelector('.carbgrams');
function ShowNumberMacro(){
   
   let totalpro=Math.round(CalorieLimit*proPerc/100/4*100)/100;
   let totalcarb=Math.round(CalorieLimit*carbPerc/100/4*100)/100;
   let totalfat=Math.round(CalorieLimit*fatPerc/100/9*100)/100;
   let percpro=100*proOfToday/totalpro;
   let percfat=100*fatOfToday/totalfat;
   let perccarb=100*carbOfToday/totalcarb;
   if(percpro>100)
      probar.style.backgroundColor="red"
   else
      probar.style.width=`${percpro}%`;
   if(percfat>100)
      fatbar.style.backgroundColor="red";
   else
      fatbar.style.width=`${percfat}%`;
   if(perccarb>100)
      carbbar.style.backgroundColor="red";
   else
      carbbar.style.width=`${perccarb}%`;

   programs.innerHTML=`${Math.round(proOfToday*100)/100}g / ${totalpro}g`;
   fatgrams.innerHTML=`${Math.round(fatOfToday*100)/100}g / ${totalfat}g`;
   carbgrams.innerHTML=`${Math.round(carbOfToday*100)/100}g / ${totalcarb}g`;
   calsIateTd.innerHTML=`${caloriesOfToday}`;
}

ShowNumberMacro();

function ShowNumberBurned(){
   burnedContainer.innerHTML=`${caloriesBurnedTd} kcal`;
   setContainer.innerHTML=`${setsTd} sets`;
   minContainer.innerHTML=`${minsTd} minutes`;
}

ShowNumberBurned();


let numberwei=document.getElementById('weight-number');
let percentwei=document.querySelector('.circlewei');

function ShowPercentWei(perc){
   var style=getComputedStyle(percentcal);
   if(perc>100)
      percentwei.style.strokeDashoffset=0;
   else
      percentwei.style.strokeDashoffset=280-280*(perc/100);
   numberwei.innerHTML=Math.round(Number(perc))+"%";
}
const weightDifference=Math.abs(GoalWeight-StartWeight);
const weightDifferenceCurrent=Math.abs(StartWeight-weightCurrent);
const percentOfGoalWeight=weightDifferenceCurrent*100/weightDifference;
ShowPercentWei(percentOfGoalWeight);


let RecentProgressDataWeek=JSON.parse(localStorage.getItem('recentProgressDataWeek'));
if(localStorage.getItem('recentProgressDataWeek')===null){
   RecentProgressDataWeek=[{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   }];
   localStorage.setItem('recentProgressDataWeek',JSON.stringify(RecentProgressDataWeek));
}

const date= new Date();
var today=date.getDay();
if(today===0)
   today=6;
else today--;
updateData();
var savedDay=Number(JSON.parse(localStorage.getItem('savedDay')));


function updateData(){
   
   const date= new Date();
   var today=date.getDay()+1;
   if(savedDay===0)
      savedDay=today;
   else{
      if(savedDay!==today){
         savedDay=today;
       /*  caloriesOfToday=0;
         fatOfToday=0;
         carbOfToday=0;
         proOfToday=0;
         localStorage.setItem('caloriesOfToday',JSON.stringify(caloriesOfToday));
         localStorage.setItem('proOfToday',JSON.stringify(proOfToday));
         localStorage.setItem('fatOfToday',JSON.stringify(fatOfToday));
         localStorage.setItem('carbOfToday',JSON.stringify(carbOfToday)); 
         localStorage.removeItem('todayFood'); */
         localStorage.setItem('savedDay',JSON.stringify(savedDay));
      }
   } 
}

function UpdateProgressWeek(){
   const daysName=['mon','tue','wed','thu','fri','sat','sun']
   for(let i=today+1 ; i<7 ; i++){
      RecentProgressDataWeek[i].calperc=0;
   }
   for(let i=0 ; i<7 ; i++){
      const cW=Number(document.querySelector(`.${daysName[i]}`).innerHTML)
      const cC=Number(document.querySelector(`.${daysName[i]}c`).innerHTML)
      const weightDifference=Math.abs(GoalWeight-StartWeight);
      if(cW===0){
         RecentProgressDataWeek[i].weiperc=0;
      }else{
         const weightDifferenceCurrent=Math.abs(StartWeight-cW);
         const percentOfGoalWeight=weightDifferenceCurrent*100/weightDifference;
         RecentProgressDataWeek[i].weiperc=percentOfGoalWeight;
      }
      
      if(cC===0){
         RecentProgressDataWeek[i].calperc=0
      }else{
         RecentProgressDataWeek[i].calperc=100*cC/CalorieLimit;
      }
   }
   RecentProgressDataWeek[today].calperc=100*caloriesOfToday/CalorieLimit;
   
   RecentProgressDataWeek.forEach((element,index)=>{
      const calbar=document.querySelector(`.cal${index}`);
      const weibar=document.querySelector(`.wei${index}`);
      if(element.calperc>100){
         calbar.style.backgroundColor="red";
         calbar.style.height=`100%`;
      }
      else{
         calbar.style.height=`${element.calperc}%`;
      }
         
      if(element.weiperc>100){
         weibar.style.backgroundColor="red";
         weibar.style.height='100%';
      }
      else{
         weibar.style.height=`${element.weiperc}%`;
      }
      
   })
   localStorage.setItem('recentProgressDataWeek',JSON.stringify(RecentProgressDataWeek));
}
if(today===0){
   RecentProgressDataWeek=[{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   },{
      calperc:0,
      weiperc:0
   }];
   localStorage.setItem('recentProgressDataWeek',JSON.stringify(RecentProgressDataWeek));
}
const s=localStorage.getItem('recentProgressDataWeek');
RecentProgressDataWeek=JSON.parse(s);

UpdateProgressWeek();
//updateData();
}

fetchData().then(data=>fetchFriends().then(data=>appRun()));






