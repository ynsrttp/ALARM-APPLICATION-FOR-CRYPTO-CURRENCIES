<template>
<sideBar></sideBar>
 
    <section class="kutu" id="section1"><i id="btc" class="fa-brands fa-bitcoin"></i><HomePage :coinList="coinList"></HomePage></section>
    <section class="kutu" id="section2"><div id="mycoins"><my-coins @coinlistemit="ekle($event)" @coinlistyay="getcoinList" @mylistyay="getmyList"></my-coins></div></section>
    <section class="kutu" id="section3"><div id="alerts"><alerts @coinlistemit="ekle($event)" @coinlistyay="getcoinList" @mylistyay="getmyList"></alerts></div></section>
    <section class="kutu" id="section4"><div id="portfolio"><portfolio @coinlistemit="ekle($event)" @coinlistyay="getcoinList" @mylistyay="getmyList"></portfolio></div></section>
    <section class="kutu" id="section5"><onchain></onchain></section>     
  
</template>

<script>
import MyCoins from './components/myCoins.vue';
import sideBar from './components/sideBar.vue';
import HomePage from './components/HomePage.vue'
import portfolio from './components/Portfoliox.vue';
import alerts from './components/alerts.vue';
import onchain from './components/onchain.vue'

export default{
  components:{
      portfolio,
      HomePage,
      alerts,
      onchain    
    },

  data(){
   
    return {

        myList:[{}],
        xtext:null,
        coinList:[]      
      
    }
  },
  methods: {
ekle(event) {
  this.xtext = event.toLowerCase(); 
  let selectedCoin = this.coinList.find(coin => coin.name.toLowerCase() === this.xtext || coin.symbol.toLowerCase() === this.xtext);
  if (selectedCoin) {
    this.myList.push(selectedCoin);
  
  } 
},

    getmyList(myList){
      
      this.myList = myList     
    
    },

    getcoinList(coinList){
      
      this.coinList = coinList;    
   }
      
  }  
}
</script>

<style>
*{

  background:black;
  margin: 0;
  padding: 0;
  
}

#hata{

  color: #ece5e5;
  position: absolute;
  top:8.3%;
  left: 44%;
  animation: fadeOut 4s forwards; 
  font-size: 14px;  
  
}

@keyframes fadeOut {
    0% {
        opacity: 1; 
    }
   

    50% {
        opacity: 1; 
    }
     
    100% {
        opacity: 0; 
    }   
   
}

#alerts{

  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

#btc{

  color: green; 
  width: 60px; 
  height: 30px; 
  color: rgba(212, 52, 12, 0.678); 
  font-size: 60px; 
  position: absolute; 
  top: 1%; 
  left: 48%;
}

#portfolio{

  width: 100%;
  margin-left: 180px;
  z-index: 1;

}


</style>






