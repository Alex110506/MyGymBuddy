let friends=[];
function fetchFriends(){
   return fetch('/getfriends')
      .then(response=>response.json())
      .then(data=>{
         const username=document.getElementById('usinp').value
         if(data!=false){
            for(let i=0 ; i<data.length ; i++){
               if(data[i].reciver===username)
                  friends.push(data[i].requester.toString());
               else{
                  friends.push(data[i].reciver.toString());
               }
            }
         }else{
            document.querySelector('.friends-cont').innerHTML+=
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

let pending=[]
function fetchReqs(){
   return fetch('/getrequests')
      .then(response=>response.json())
      .then(data=>{
         const username=document.getElementById('usinp').value
         if(data!=false){
            for(let i=0 ; i<data.length ; i++){
               pending.push(data[i].requester.toString())
            }
         }else{
            document.querySelector('.requests').innerHTML+=
            `
            <div class='not-found-cont'>
               <img class='not-found-img' src='/icons/search.png'>   
               <h1 class='not-found-msg'>No friends requests!</h1>
            </div>
            `
         }
      })
      .catch(err=>console.log(err))
}

function fetchData(){
   return fetch('/data')
      .then(response=>response.json())
      .then(data=>{
         document.getElementById('usinp').value=data[0].user
         document.getElementById('eminp').value=data[0].email
         if(data[0].image){
            document.getElementById('image').src=`/prfimgs/${data[0].image}`
         }else{
            document.getElementById('image').src=`/icons/blank.png`
         }
      })
}

function appRun(){

const frndBtn=document.querySelector('.friends-btn');
const reqBtn=document.querySelector('.pending-btn');
const frndCont=document.querySelector('.friends-cont')
const reqCont=document.querySelector('.request-cont');
const accBox=document.querySelector('.accept-box')
const delBox=document.querySelector('.delete-box')
frndBtn.addEventListener('click',()=>{
   reqCont.style.visibility='hidden';
   reqCont.style.position='absolute';
   frndCont.style.visibility='visible';
   frndCont.style.position='relative';
   accBox.style.visibility='hidden'
   delBox.style.visibility='hidden';
   frndBtn.style.backgroundColor='rgba(255, 255, 255, 0.425)'
   reqBtn.style.backgroundColor='rgba(255, 255, 255, 0.089)'
})

reqBtn.addEventListener('click',()=>{
   frndCont.style.visibility='hidden';
   frndCont.style.position='absolute';
   reqCont.style.visibility='visible';
   reqCont.style.position='relative';
   accBox.style.visibility='hidden'
   delBox.style.visibility='hidden';
   reqBtn.style.backgroundColor='rgba(255, 255, 255, 0.425)'
   frndBtn.style.backgroundColor='rgba(255, 255, 255, 0.080)'
})

friends.forEach((item)=>{
   let html=`
      <div class='friend-cont'>
         <img class='friend-img' src='/icons/blank.png'>
         <span class='friend-name'>${item}</span>
         <button class='message-friend dely'
         data-name='${item}'>
            <img src='/icons/images.png'>
         </button>
      </div>
   `
   document.querySelector('.friends-cont').innerHTML+=html;
})
pending.forEach((item)=>{
   let html=`
      <div class='req-cont'>
         <img class='friend-img' src='/icons/blank.png'>
         <span class='friend-name'>${item}</span>
         <button class='message-friend accept'
         data-name='${item}'>
            <img src='/icons/dots.png'>
         </button>
      </div>
   `
   document.querySelector('.requests').innerHTML+=html;
})



let showPass=document.querySelector('.show-pass');
let passInput=document.getElementById('passinp');
showPass.addEventListener('click',()=>{
   if(passInput.type=="password"){
      passInput.type="text";
   }
   else{
      passInput.type="password";
   }
})

let showPassNew=document.querySelector('.show-pass-new');
let passInputNew=document.getElementById('passinpnew');
showPassNew.addEventListener('click',()=>{
   if(passInputNew.type=="password"){
      passInputNew.type="text";
   }
   else{
      passInputNew.type="password";
   }
})

let emailInput=document.getElementById('eminp');

let changeEmailBtn=document.getElementById('chemail');

changeEmailBtn.addEventListener('click',()=>{
   if(emailInput.readOnly==true){
      emailInput.readOnly=false;
      emailInput.style.backgroundColor="rgba(255,255,255,0.6)";
      changeEmailBtn.innerHTML="Set this email";
   }
   else{
      emailInput.readOnly=true;
      emailInput.style.backgroundColor="white";
      changeEmailBtn.innerHTML="Change Email";
   }
})

document.querySelectorAll('.accept').forEach((button)=>{
   button.addEventListener('click',()=>{
      const name=button.dataset.name;
      document.querySelector('.accept-box').style.visibility='visible';
      document.getElementById('req-name-acc').value=name.toString();
   })
})
document.querySelectorAll('.dely').forEach((button)=>{
   button.addEventListener('click',()=>{
      const name=button.dataset.name;
      document.querySelector('.delete-box').style.visibility='visible';
      document.getElementById('del-name-acc').value=name.toString();
   })
})


document.querySelector('.close-box').addEventListener('click',()=>{
   document.querySelector('.accept-box').style.visibility='hidden';
})
document.querySelector('.close-box-del').addEventListener('click',()=>{
   document.querySelector('.delete-box').style.visibility='hidden';
})
}

fetchData().then(data=>fetchFriends().then(data=>fetchReqs().then(data=>appRun())));