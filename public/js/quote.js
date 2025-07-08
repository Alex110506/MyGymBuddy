const quotes=[{
   quote: `"The only bad workout is the one that didn't happen." `
},{
   quote: `"Success usually comes to those who are too busy to be looking for it."`
},{
   quote: `"The pain you feel today will be the strength you feel tomorrow."`
},{
   quote: `"Take care of your body. It's the only place you have to live."`
},{
   quote: `You don't have to be extreme, just consistent."`
},{
   quote: `"Push yourself, because no one else is going to do it for you."`
},{
   quote: `"Exercise is king. Nutrition is queen. Put them together, and you've got a kingdom."`
},{
   quote: `"The body achieves what the mind believes."`
},{
   quote: `"What seems impossible today will one day become your warm-up."`
},{
   quote: `"To enjoy the glow of good health, you must exercise."`
},{
   quote: `"Strength does not come from the physical capacity. It comes from an indomitable will."`
},{
   quote: `"No matter how slow you go, you're still lapping everybody on the couch."`
}]



let btn=document.querySelector('.generate-btn');
let Quote=document.querySelector('.quote-text');
btn.addEventListener('click',()=>{
   let random=Math.floor(Math.random()*quotes.length);
   Quote.innerHTML=quotes[random].quote;
})