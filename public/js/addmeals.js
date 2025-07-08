import { foodItems } from "./mealarray.js";

let caloriesOfToday=0//Number(JSON.parse(localStorage.getItem('caloriesOfToday')));
let proOfToday=0//Number(JSON.parse(localStorage.getItem('proOfToday')));
let carbOfToday=0//Number(JSON.parse(localStorage.getItem('carbOfToday')));
let fatOfToday=0//Number(JSON.parse(localStorage.getItem('fatOfToday')));
let todayFood=[];

function fetchMeals(){
   return fetch('/meals')
      .then(response=>response.json())
      .then(data=>{
         for(let i=0 ; i<data.length ; i++){
            let currentItem={
               name:data[i].name,
               time:data[i].timeOfDay,
               calories:data[i].cals,
               pro:data[i].pro,
               fat:data[i].fat,
               carb:data[i].carb
            };
            todayFood.push(currentItem);
         }
      })
      .catch(err=>console.log(err));
}



function fetchData(){
   return fetch('/data')
      .then(response=>response.json())
      .then(data=>{
         document.querySelector('.user-weight').innerHTML=data[0].calGoal
         document.querySelector('.currCals').value=data[0].todayCal
         document.querySelector('.currPro').value=data[0].tdPro
         document.querySelector('.currFat').value=data[0].tdFat
         document.querySelector('.currCarb').value=data[0].tdCarb
         caloriesOfToday=data[0].todayCal
         fetchMeals();
      })
      .catch(error=>console.log(error))
}




function appRun()
{
let searchBar=document.querySelector('.user-message');
let scrollSpace=document.querySelector('.scroll-space');
let breakfastBtn=document.querySelector('.breakfast-btn');
let lunchBtn=document.querySelector('.lunch-btn');
let dinnerBtn=document.querySelector('.dinner-btn');
let snackBtn=document.querySelector('.snack-btn');
var z=document.getElementById('btn');
let timeOfMeal=document.querySelector('.time-of-meal');
let quantitySelector=document.getElementById('type-of-quantity');
let calorieNumber=document.getElementById('calorie-number');
let btnbox=document.querySelector('.button-box');
let timeInp=document.querySelector('.curr-time');

foodItems.sort((a,b)=>{
   if(a.name<b.name) return -1;
   else return 1;
});



breakfastBtn.addEventListener('click',()=>{
   z.style.visibility="visible"
   z.style.left="0px";
   var w=btnbox.style.width;
   meal=1;
   todayFood.forEach((element)=>{
      if(element.time===meal)
         console.log(element);
   });
   ShowStart(meal);
   timeOfMeal.innerHTML=`Breakfast`
   timeInp.value='1'
})
lunchBtn.addEventListener('click',()=>{
   var w=Number(btnbox.offsetWidth);
   z.style.visibility="visible"
   z.style.left=`${w/4}px`;
   meal=2;
   todayFood.forEach((element)=>{
      if(element.time===meal)
         console.log(element);
   });
   ShowStart(meal);
   timeOfMeal.innerHTML=`Lunch`
   timeInp.value='2'
})
dinnerBtn.addEventListener('click',()=>{
   var w=Number(btnbox.offsetWidth);
   z.style.visibility="visible"
   z.style.left=`${w/4*2}px`;
   meal=3;
   todayFood.forEach((element)=>{
      if(element.time===meal)
         console.log(element);
   });
   ShowStart(meal);
   timeOfMeal.innerHTML=`Dinner`
   timeInp.value='3'
})
snackBtn.addEventListener('click',()=>{
   var w=Number(btnbox.offsetWidth);
   z.style.visibility="visible"
   z.style.left=`${w/4*3}px`;
   meal=4;
   todayFood.forEach((element)=>{
      if(element.time===meal)
         console.log(element);
   });
   ShowStart(meal);
   timeOfMeal.innerHTML=`Snack`
   timeInp.value='4'
})

let index=1;

function GenerateItem(){
   let i=0;
   let html='';
   for(i=0 ; i<foodItems.length ; i++){
      let elem=foodItems[i];
      html+=`
         <div class="food-item">
            <img src="../icons/meal.png">
            <div class="food-title">
               <div class="title">${elem.name}</div>
               <div class="cals">${elem.calories} kcal</div>
            </div>
            <button class="add-food" 
               data-info="${elem.name}" 
               data-cal="${elem.calories}"
               data-pro="${elem.protein}"
               data-carb="${elem.carbs}"
               data-fat="${elem.fats}"
               data-perc="${elem.healthPerc}"
               data-fact="${elem.fact}"
            >+</button>
         </div>
      `
   }
   scrollSpace.innerHTML+=html;
}
GenerateItem();

function searchInArr(inputValue){
   let html=''
   foodItems.forEach((item)=>{
      const name=item.name.toLowerCase();
      const search=inputValue.toLowerCase();
      if(name.includes(search)===true){
         html+=`
            <div class="food-item">
               <img src="../icons/meal.png">
               <div class="food-title">
                  <div class="title">${item.name}</div>
                  <div class="cals">${item.calories} kcal</div>
               </div>
               <button class="add-food" 
                  data-info="${item.name}" 
                  data-cal="${item.calories}"
                  data-pro="${item.protein}"
                  data-carb="${item.carbs}"
                  data-fat="${item.fats}"
                  data-perc="${item.healthPerc}"
                  data-fact="${item.fact}"
               ">+</button>
            </div>
         `
      }
   });
   return html;
}


const itemName=document.querySelector('.name');
const itemCal=document.querySelector('.nrcal');
const itemPro=document.querySelector('.gramsp');
const itemFat=document.querySelector('.gramsf');
const itemCarb=document.querySelector('.gramsc');
const itemPerc=document.getElementById('perc-number');
const itemFact=document.querySelector('.facts');
const Pbar=document.querySelector('.probar');
const Fbar=document.querySelector('.fatbar');
const Cbar=document.querySelector('.carbbar');
const healthCirc=document.querySelector('.circleperc');
const calCirc=document.querySelector('.circlecal');


let searchedFood=[];
function searchFoodApi1(productName) {
   const endpoint = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(productName)}&json=1&lc=en&fields=product_name,energy_100g,fat_100g,carbohydrates_100g,proteins_100g,sugars_100g,ingredients_text`;
   searchedFood=[]
   fetch(endpoint)
      .then(response => {
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         return response.json();
      })
      .then(data => {
         if (data.products && data.products.length > 0) {
            searchedFood=data.products;
            searchedFood=searchedFood.filter((item)=>item.product_name)
            scrollSpace.innerHTML+="<h2 style='color:white; margin:10px 5px;'>Other results</h2>"

            if(searchedFood.length===0){
               scrollSpace.innerHTML+="<p style='color:white; margin:10px 15px;'>No products were found...</p>"
            }
            else{
               const newItems=searchedFood.map((item)=>{
                  return `
                     <div class="food-item">
                        <img src="../icons/meal.png">
                        <div class="food-title" id="food-tit-add">
                           <div class="title" id="title-added">${item.product_name}</div>
                           <div class="cals">${
                              Math.floor(item.proteins_100g*4
                                 +4*item.carbohydrates_100g
                                 +9*item.fat_100g)
                           } kcal</div>
                        </div>
                        <button class="add-food" 
                           data-info="${item.product_name}" 
                           data-cal="${
                              Math.floor(item.proteins_100g*4
                                 +4*item.carbohydrates_100g
                                 +9*item.fat_100g)
                           }"
                           data-pro="${item.proteins_100g}"
                           data-carb="${item.carbohydrates_100g}"
                           data-fat="${item.fat_100g}"
                           data-perc="${0}"
                           data-fact="${item.ingredients_text}"
                        ">+</button>
                     </div>
                  `
               })
               let htmll='';
               newItems.forEach((item)=>htmll+=item);
               scrollSpace.innerHTML+=htmll;

               document.querySelectorAll('.add-food').forEach((button) => {
                  button.addEventListener('click', function() {
                     const {info,cal,pro,fat,carb,perc,fact} = button.dataset;
                     var w=Number(window.innerWidth);
                     if(w<1201){
                        itemName.value=`${info}`;
                        itemCal.value=`${cal} kcal`;
                        itemPro.value=`${pro}g / 100g`;
                        Pbar.style.width=`${Math.max(6,pro)*(6/10)}%`
                        itemFat.value=`${fat}g / 100g`;
                        Fbar.style.width=`${Math.max(6,fat)*(6/10)}%`
                        itemCarb.value=`${carb}g / 100g`;
                        Cbar.style.width=`${Math.max(6,carb)*(6/10)}%`
                        itemPerc.innerHTML=`${perc}%`;
                        
                     }
                     else{
                        itemName.value=`${info}`;
                        itemCal.value=`${cal} kcal`;
                        itemPro.value=`${pro}g / 100g`;
                        Pbar.style.width=`${Math.max(6,pro)/5}%`
                        itemFat.value=`${fat}g / 100g`;
                        Fbar.style.width=`${Math.max(6,fat)/5}%`
                        itemCarb.value=`${carb}g / 100g`;
                        Cbar.style.width=`${Math.max(6,carb)/5}%`
                        itemPerc.innerHTML=`${perc}%`;
                     }
                     
                     itemFact.innerHTML=`
                        <div class="fact-title">Did you know that?</div>
                        <div class="fact-text">
                           ${fact}
                        </div>
                     `
                     healthCirc.style.strokeDashoffset=570-570*(perc/100);
                  });
               });
            }
         } else {
            console.log('No products found.');
         }
      })
      .catch(error => console.error('Error fetching data from API:', error)); 
}

let mainpage=document.querySelector('.main');
searchBar.addEventListener('keydown',(e)=>{
   if(e.code=== "Enter"){
      let inputV=searchBar.value;
      let html=searchInArr(inputV);
      searchFoodApi1(inputV)


      //adding results from my database
      if(html=== ''){
         html=`
            <div class="not-found">
               <img src="../icons/not found.png">
               <div class="not-found-text">
                  Whoops!
               </div>
               <div class="we-did-not">
                  We did not find what you were looking for.
               </div>
               <div class="add-item-please">You can register the item you want!</div>
               <button class="add-food-btn">Add Food</button>
            </div>
         `
         scrollSpace.innerHTML=html;
         let updateFoodButton=document.querySelector('.add-food-btn');
         updateFoodButton.addEventListener('click',()=>{
            
            mainpage.innerHTML+=`
            <div class="popup popupid">
               <div class="popup-interface">
                  <div class="popup-cals">
                     <input type="text" placeholder="Enter Food Name" class="name-popup">
                  </div>
                  <div class="popup-labels">
                     <div class="labell">Calories</div>
                     <div class="labell">Protein</div>
                     <div class="labell">Fats</div>
                     <div class="labell">Carbs</div>
                  </div>
                  <div class="popup-macros">
                     <input type="number" placeholder="/100g" class="input-popup calorrr">
                     <input type="number" placeholder="/100g" class="input-popup prottt">
                     <input type="number" placeholder="/100g" class="input-popup fattt">
                     <input type="number" placeholder="/100g" class="input-popup carbbb">
                  </div>
                  <button class="popup-button">Add food item</button>
                  <button class="close-btn">x</button>
               </div>
               
            </div>`; 
            let updateWeightButtonPop=document.querySelector('.popup-button');
            
            let closeBtn=document.querySelector('.close-btn');
            updateWeightButtonPop.addEventListener('click',()=>{
               let inputPopup=document.querySelector('.name-popup').value;
               let calPop=Number(document.querySelector('.calorrr').value);
               let proPop=Number(document.querySelector('.prottt').value);
               let fatPop=Number(document.querySelector('.fattt').value);
               let carbPop=Number(document.querySelector('.carbbb').value);
               let currentItem={name:inputPopup,protein:proPop,carbs:carbPop,fats:fatPop,calories:calPop,healthPerc:0,fact:""};
               foodItems.push(currentItem);
               localStorage.setItem("foodItems",JSON.stringify(foodItems));
               location.reload();
            })
            closeBtn.addEventListener('click',()=>{
               location.reload();
            })
         }) 
      }
      else{
         scrollSpace.innerHTML="<h2 style='color:white; margin:10px 5px;'>These are our results!</h2>"
         scrollSpace.innerHTML+=html;
         document.querySelectorAll('.add-food').forEach((button) => {
            button.addEventListener('click', function() {
               const {info,cal,pro,fat,carb,perc,fact} = button.dataset;
               var w=Number(window.innerWidth);
               if(w<1201){
                  itemName.value=`${info}`;
                  itemCal.value=`${cal} kcal`;
                  itemPro.value=`${pro}g / 100g`;
                  Pbar.style.width=`${Math.max(6,pro)*(6/10)}%`
                  itemFat.value=`${fat}g / 100g`;
                  Fbar.style.width=`${Math.max(6,fat)*(6/10)}%`
                  itemCarb.value=`${carb}g / 100g`;
                  Cbar.style.width=`${Math.max(6,carb)*(6/10)}%`
                  itemPerc.innerHTML=`${perc}%`;
                  
               }
               else{
                  itemName.value=`${info}`;
                  itemCal.value=`${cal} kcal`;
                  itemPro.value=`${pro}g / 100g`;
                  Pbar.style.width=`${Math.max(6,pro)/5}%`
                  itemFat.value=`${fat}g / 100g`;
                  Fbar.style.width=`${Math.max(6,fat)/5}%`
                  itemCarb.value=`${carb}g / 100g`;
                  Cbar.style.width=`${Math.max(6,carb)/5}%`
                  itemPerc.innerHTML=`${perc}%`;
               }
               
               itemFact.innerHTML=`
                  <div class="fact-title">Did you know that?</div>
                  <div class="fact-text">
                     ${fact}
                  </div>
               `
               healthCirc.style.strokeDashoffset=570-570*(perc/100);
            });
         });
      }

   }
})


let info=0,cal=0,pro=0,fat=0,carb=0,perc=0,fact=0;
document.querySelectorAll('.add-food').forEach((button) => {
   button.addEventListener('click', function() {
      info = button.dataset.info;
      cal= button.dataset.cal;
      pro=button.dataset.pro;
      fat=button.dataset.fat;
      carb=button.dataset.carb;
      perc=button.dataset.perc;
      fact=button.dataset.fact;
      itemName.value=`${info}`;
      itemCal.value=`${cal} kcal`;
      
      var w=Number(window.innerWidth);
      if(w<1201){
         itemPro.value=`${pro}g / 100g`;
         Pbar.style.width=`${Math.max(6,pro)*(6/10)}%`
         itemFat.value=`${fat}g / 100g`;
         Fbar.style.width=`${Math.max(6,fat)*(6/10)}%`
         itemCarb.value=`${carb}g / 100g`;
         Cbar.style.width=`${Math.max(6,carb)*(6/10)}%`
      }
      else{
         itemPro.value=`${pro}g / 100g`;
         Pbar.style.width=`${Math.max(6,pro)/5}%`
         itemFat.value=`${fat}g / 100g`;
         Fbar.style.width=`${Math.max(6,fat)/5}%`
         itemCarb.value=`${carb}g / 100g`;
         Cbar.style.width=`${Math.max(6,carb)/5}%`
      }
      itemPerc.innerHTML=`${perc}%`;
      itemFact.innerHTML=`
         <div class="fact-title">Did you know that?</div>
         <div class="fact-text">
            ${fact}
         </div>
      `
      healthCirc.style.strokeDashoffset=570-570*(perc/100);
   });
});

/* let todayFood=[];
if(localStorage.getItem('todayFood')===null)
   todayFood=[];
else
   todayFood=JSON.parse(localStorage.getItem('todayFood'));
*/

const addBtn=document.querySelector('.add-to-foods');

var meal='breakfast';
let listOfToday=document.querySelector('.what-i-ate');

let CalorieLimit=Number(document.querySelector('.user-weight').innerHTML);
if(CalorieLimit==0)
   CalorieLimit=2500;

function ShowStart(meal){
   let html=''
   todayFood.forEach((element)=>{
      if(element.time===meal){
         html+=`
            <div class="food-info">
               <div id="food-title-td">${element.name}</div>
               
               <div class="food-macros-add">
                  <div class="cals-in-meal">
                     <div class="cals-title">
                        Calories
                     </div>
                     <div class="cals-number">
                        ${element.calories}
                     </div>
                  </div>
                  <div class="pro-in-meal">
                     <div class="pro-title">
                        Protein
                     </div>
                     <div class="pro-number">
                        ${element.pro} g
                     </div>
                  </div>
                  <div class="carb-in-meal">
                     <div class="carb-title">
                        Carbs
                     </div>
                     <div class="carb-number">
                        ${element.carb} g
                     </div>
                  </div>
                  <div class="fat-in-meal">
                     <div class="fat-title">
                        Fats
                     </div>
                     <div class="fat-number">
                        ${element.fat} g
                     </div>
                  </div>
               </div>
            </div>
         `
      }
   });
   listOfToday.innerHTML=html;
   let calpercc=(100*caloriesOfToday)/CalorieLimit;
   calorieNumber.innerHTML=`${Math.round(calpercc)}%`
   calCirc.style.strokeDashoffset=690-690*(calpercc/100);
}
ShowStart(meal);


let quantityInput=document.getElementById('quantity-input');

addBtn.addEventListener('click',()=>{
   if(itemName.value!==null){
      let quantityValue=Number(quantitySelector.value);
      let multiplier;
      if(quantityValue===1)
         multiplier=0.01;
      if(quantityValue===2)
         multiplier=1;
      let quantityTotal=multiplier*Number(quantityInput.value);
      info=itemName.value;
      let calHere=Number(itemCal.value.split('k')[0]);
      let proHere=Number(itemPro.value.split('g')[0]);
      let fatHere=Number(itemFat.value.split('g')[0]);
      let carbHere=Number(itemCarb.value.split('g')[0]);
      caloriesOfToday+=calHere*quantityTotal;
      proOfToday+=proHere*quantityTotal;
      fatOfToday+=fatHere*quantityTotal;
      carbOfToday+=carbHere*quantityTotal;
      localStorage.setItem('caloriesOfToday',JSON.stringify(caloriesOfToday));
      localStorage.setItem('proOfToday',JSON.stringify(proOfToday));
      localStorage.setItem('fatOfToday',JSON.stringify(fatOfToday));
      localStorage.setItem('carbOfToday',JSON.stringify(carbOfToday));
      let calQ=Math.round(calHere*quantityTotal*1000)/1000;
      let proQ=Math.round(proHere*quantityTotal*1000)/1000;
      let fatQ=Math.round(fatHere*quantityTotal*1000)/1000;
      let carbQ=Math.round(carbHere*quantityTotal*1000)/1000;
      let currentItem={name:info,time:meal,calories:calQ,pro:proQ,fat:fatQ,carb:carbQ};
   //   todayFood.push(currentItem);
    //  localStorage.setItem('todayFood',JSON.stringify(todayFood));
      
      let html='';
      todayFood.forEach((element)=>{
         if(element.time===meal){
            html+=`
               <div class="food-info">
                  <div id="food-title-td">${element.name}</div>
                  
                  <div class="food-macros-add">
                     <div class="cals-in-meal">
                        <div class="cals-title">
                           Calories
                        </div>
                        <div class="cals-number">
                           ${element.calories}
                        </div>
                     </div>
                     <div class="pro-in-meal">
                        <div class="pro-title">
                           Protein
                        </div>
                        <div class="pro-number">
                           ${element.pro} g
                        </div>
                     </div>
                     <div class="carb-in-meal">
                        <div class="carb-title">
                           Carbs
                        </div>
                        <div class="carb-number">
                           ${element.carb} g
                        </div>
                     </div>
                     <div class="fat-in-meal">
                        <div class="fat-title">
                           Fats
                        </div>
                        <div class="fat-number">
                           ${element.fat} g
                        </div>
                     </div>
                  </div>
               </div>
            `
         }
      });
      listOfToday.innerHTML=html;
      let calpercc=(100*caloriesOfToday)/CalorieLimit;
      calorieNumber.innerHTML=`${Math.round(calpercc)}%`
      calCirc.style.strokeDashoffset=690-690*(calpercc/100);
   }
   else
      alert('Please slect an item to add!');
})

window.onload=OnLoad();

function OnLoad(){
   const date= new Date();
   var today=date.getDay()+1;
   var savedDay=Number(JSON.parse(localStorage.getItem('savedDay2')));

   if(savedDay!==today){
      if(savedDay===0)
         savedDay=today;
      savedDay=today;
      caloriesOfToday=0;
      fatOfToday=0;
      carbOfToday=0;
      proOfToday=0;
      localStorage.setItem('caloriesOfToday',JSON.stringify(caloriesOfToday));
      localStorage.setItem('proOfToday',JSON.stringify(proOfToday));
      localStorage.setItem('fatOfToday',JSON.stringify(fatOfToday));
      localStorage.setItem('carbOfToday',JSON.stringify(carbOfToday));
     // localStorage.removeItem('todayFood');
      localStorage.setItem('savedDay2',JSON.stringify(savedDay));
   }
}

}

fetchData().then(data=>appRun());






