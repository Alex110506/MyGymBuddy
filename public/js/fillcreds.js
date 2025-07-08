let calcBtn=document.querySelector('.calc-btn');
let resultcalc=document.getElementById('calcres');
calcBtn.addEventListener('click',()=>{
    let agenr=Number(document.querySelector('.ageinput').value);
    let weinr=Number(document.querySelector('.weiinput').value);
    let heinr=Number(document.querySelector('.heiinput').value);
    let genderSelect=document.querySelector('.gensel');
    let activitySelector=document.querySelector('.actsel');
    let weigoalnr=Number(document.querySelector('.weigoalinput'));
    let goalnr=Number(document.querySelector('.goalsel').value);
    if(agenr==0 || weigoalnr==0 || weinr==0 || heinr==0 || goalnr==1 || genderSelect.value=="1" || activitySelector.value=="1")
        alert("Please fill in all the Inputs")
    else{
        let result=0;
        if(genderSelect.value=="2"){
            result=10*weinr+6.25*heinr-5*agenr+5;
        }
        if(genderSelect.value=="3"){
            result=10*weinr+6.25*heinr-5*agenr-161;
        }
        if(activitySelector.value=="2")
            result*=1.2;
        if(activitySelector.value=="3")
            result*=1.375;
        if(activitySelector.value=="4")
            result*=1.55;
        if(activitySelector.value=="5")
            result*=1.9;
        if(goalnr===2){
            result-=300
        }
        if(goalnr===4){
            result+=300;
        }
        result=Math.round(result);
        resultcalc.value=result.toString()+" Kcal/day";
    }
    
})