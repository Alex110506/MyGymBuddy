var x=document.getElementById('login');
var y=document.getElementById('register');
var z=document.getElementById('btn');
var showbtn=document.getElementById('showpass1');
function registerr(){
   x.style.visibility='hidden';
   x.style.position='absolute'
   y.style.visibility='visible';
   y.style.position='relative'
   z.style.left="160px"
}
function loginn(){
   x.style.visibility='visible';
   x.style.position='relative'
   y.style.visibility='hidden';
   y.style.position='absolute'
   z.style.left="0px";
}
document.getElementById('passkey2').addEventListener('input',(event)=>{
   const password=document.getElementById('passkey2').value;
   let reqs='';
   let ok=0;
   if(password.length>=8){
      ok=1;
      document.querySelector('.pass-sec1').style.color='rgb(114, 241, 114)';
      document.querySelector('.pass-sec1').innerHTML='✓'+document.querySelector('.pass-sec1').innerHTML.slice(1,document.querySelector('.pass-sec1').innerHTML.length);
   }
   else{
      document.querySelector('.pass-sec1').style.color='rgb(255, 120, 120)'
      document.querySelector('.pass-sec1').innerHTML='✕'+document.querySelector('.pass-sec1').innerHTML.slice(1,document.querySelector('.pass-sec1').innerHTML.length);
   }
   let ok1=0,ok2=0,ok3=0,ok4=0;
   let aplh='qwertyuiopasdfghjklzxcvbnm';
   let aplhUp='QWERTYUIOPASDFGHJKLZXCVBNM';
   let nums='1234567890';
   let symb='!@#$%^&*-_';
   for(let i=0 ; i<password.length ; i++){
      if(aplh.search(password.at(i))!==-1) ok1=1;
   }
   for(let i=0 ; i<password.length ; i++){
      if(aplhUp.search(password.at(i))!==-1) ok2=1;
   }
   for(let i=0 ; i<password.length ; i++){
      if(nums.search(password.at(i))!==-1) ok3=1;
   }
   for(let i=0 ; i<password.length ; i++){
      if(symb.search(password.at(i))!==-1) ok4=1;
   }
   if(ok1===1 && ok2===1){
      document.querySelector('.pass-sec2').style.color='rgb(114, 241, 114)';
      document.querySelector('.pass-sec2').innerHTML='✓'+document.querySelector('.pass-sec2').innerHTML.slice(1,document.querySelector('.pass-sec2').innerHTML.length);
   }
   else{
      document.querySelector('.pass-sec2').style.color='rgb(255, 120, 120)'
      document.querySelector('.pass-sec2').innerHTML='✕'+document.querySelector('.pass-sec2').innerHTML.slice(1,document.querySelector('.pass-sec2').innerHTML.length);
   }

   if(ok3===1){
      document.querySelector('.pass-sec3').style.color='rgb(114, 241, 114)';
      document.querySelector('.pass-sec3').innerHTML='✓'+document.querySelector('.pass-sec3').innerHTML.slice(1,document.querySelector('.pass-sec3').innerHTML.length);
   }
   else{
      document.querySelector('.pass-sec3').style.color='rgb(255, 120, 120)'
      document.querySelector('.pass-sec3').innerHTML='✕'+document.querySelector('.pass-sec3').innerHTML.slice(1,document.querySelector('.pass-sec3').innerHTML.length);
   }

   if(ok4===1){
      document.querySelector('.pass-sec4').style.color='rgb(114, 241, 114)';
      document.querySelector('.pass-sec4').innerHTML='✓'+document.querySelector('.pass-sec4').innerHTML.slice(1,document.querySelector('.pass-sec4').innerHTML.length);
   }
   else{
      document.querySelector('.pass-sec4').style.color='rgb(255, 120, 120)'
      document.querySelector('.pass-sec4').innerHTML='✕'+document.querySelector('.pass-sec4').innerHTML.slice(1,document.querySelector('.pass-sec4').innerHTML.length);
   }
   if(ok===1 && ok1===1 && ok2===1 && ok3===1 && ok4===1){
      document.querySelector('.regis').type='submit';
   }else{
      document.querySelector('.regis').type='button';
   }
})