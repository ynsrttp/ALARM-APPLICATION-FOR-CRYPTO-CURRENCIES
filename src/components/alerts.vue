<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <div class="watchlist">    
      <div class="search">    
    <input v-model="xtext" ref="searchInput" @keydown.enter="eklex" id="addinput" type="text" placeholder=" Coin Name" maxlength="10" >    
    <button @click="eklex" id="addbtn" type="button">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>  
     </div>    
       <div @mousemove="yay(myList)" class="container">
         <div v-for="list in myList"   class="coins"> {{list.symbol}}    
            <h1 class="price"> {{list.priceUsd}}</h1>
            <input  class="alertinputhigher" type="number" v-model="list.alertPricehigher" />
            <button class="alertbtnhigher" @click="alertmhigher(list)" ><i class="fa-solid fa-circle-play"></i></button>
            <h1 id="alertsymbolhigher">{{list.symbol}} < </h1>
            <input class="alertinputlower" type="number" v-model="list.alertPricelower" />
            <button class="alertbtnlower" @click="alertlower(list)"><i class="fa-solid fa-circle-play"></i></button>
            <h1 id="alertsymbollower">{{list.symbol}} > </h1>
            <button @click="coinisil(list)" class="sil">
              <i class="fa-regular fa-circle-xmark"></i>
            </button>         
         </div>
     </div>

     <h2 id="alarmHDiv" >ALERT </h2>
    </div> 
      </template>
      
      <script>
      import axios from 'axios';
      
      export default {

        watch: {
  coinPrices(newPrices, oldPrices) {

    this.alertshigher.forEach(alert => {
      console.log("alertshigher.forEach döngüsü çalıştı");
      const coinPrice = this.coinPrices.find(coin => coin.symbol === alert.alertsymbol);
      if (coinPrice && alert.alertPricehigher > coinPrice.priceUsd) {
        this.isAlarmRinging=true;
        document.getElementById("alarmHDiv").style.visibility = "visible";
setTimeout(function() {
  document.getElementById("alarmHDiv").style.visibility = "hidden";
}, 10000);
        const audio = new Audio('/src/assets/alert.mp3');
        audio.play();
        setTimeout(() => {
  audio.pause();
  audio.currentTime = 0; 
}, 15000);
        this.clickListener();
    
        console.log("Coin:" + alert.alertsymbol +" "+ "Fiyat:" + alert.alertPricehigher ) 
      }
    });
  },

  coinPriceslower(newPrices, oldPrices) { 

    this.alertslower.forEach(alert => {
   
      const coinPrice = this.coinPrices.find(coin => coin.symbol === alert.alertsymbol);
      if (coinPrice && alert.alertPricelower < coinPrice.priceUsd) {
        this.isAlarmRinging=true;
        document.getElementById("alarmHDiv").style.visibility = "visible";
        setTimeout(function() {
       document.getElementById("alarmHDiv").style.visibility = "hidden";
       }, 15000);
        const audio = new Audio('/src/assets/alert.mp3');
        audio.play();
        setTimeout(() => {
  audio.pause();
  audio.currentTime = 0; 
}, 15000);
        this.clickListener();
        console.log("Coin:" + alert.alertsymbol +" "+ "Fiyat:" + alert.alertPricelower )      
      }
    });
  },
 
},
        data() {
          return { 
            
            myList:[ { id: '1', name:'BİTCOİN', symbol: 'BTC', priceUsd: '' }],
            coinList:[{id:'', name:'', symbol:'',priceUsd:'', alertPrice: 0, isAlarmRinging: false, alertPrice: 0,}],
            xtext: null,
            response:[],
            alertPricehigher:1,
            coinPrices:null,
            coinPriceslower:null,
            selectedCoin: null,
            i:null,
            isAlarmRinging: false,
            alertshigher:[],
            alertslower:[],
            alertPricelower:1,                             
          };
        }, 
   
        methods : {
          coinisil(list){
            if(this.myList.length>3){
            this.myList = this.myList.filter(t => t !== list)}           

          },
          alerthigher(list) {

  const audio = new Audio('/src/assets/alert.mp3');

  list.alertPricehigher = parseFloat(list.alertPricehigher);

  list.isAlarmRinging = true;

  const high = list.symbol;

  
  this.alertshigher.push({ alertsymbol: high, alertPricehigher: list.alertPricehigher });

  console.log(this.alertshigher);
  console.log(JSON.stringify(this.alertshigher, null, 2));
  
},

alertlower(list){

  list.alertPricelower = parseFloat(list.alertPricelower);
  list.isAlarmRinging = true;
  const low = list.symbol;
  
  this.alertslower.push({ alertsymbol: low, alertPricelower: list.alertPricelower });
  console.log(this.alertslower);
  console.log(JSON.stringify(this.alertslower, null, 2));

},

clickListener() {

    if (this.isAlarmRinging) {   
        this.audio.pause(); 
    this.audio.currentTime = 0;
    this.isAlarmRinging = false;
      }
    },


yay() {
          this.$emit('mylistyay', this.myList);
          this.$emit('coinlistyay', this.coinList);
          },
    
eklex(){
    
          this.$emit('coinlistemit', this.xtext);
          this.xtext = null;
         
      },
clearSearch(){
    this.$refs.searchInput.value = '';
    },
    
          async updateCoinPrices() {
          try {
            const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                  headers: {
                    'X-CMC_PRO_API_KEY': 'a070384f-61d6-4a24-9e6c-63a7fd476698'
                  }                
                  
                })                
    
                this.response=response;     
  
   this.coinList = response.data.data.map(asset => {
              return {
                id: asset.id,
                name:asset.name,
                symbol: asset.symbol,
                priceUsd: asset.quote.USD.price > 1000 ? Number(asset.quote.USD.price).toFixed(0)  : asset.quote.USD.price > 100 ? Number(asset.quote.USD.price).toFixed(1) : asset.quote.USD.price > 1? Number(asset.quote.USD.price).toFixed(2) : asset.quote.USD.price > 0.01  ? Number(asset.quote.USD.price).toFixed(4)  : asset.quote.USD.price > 0.00099 ? Number(asset.quote.USD.price).toFixed(6)  : Number(asset.quote.USD.price).toFixed(8), 
                marketCap: asset.quote.USD.market_cap.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                change24h: asset.quote.USD.percent_change_24h.toFixed(1),
                change7d: asset.quote.USD.percent_change_7d.toFixed(1),
                circulatingSupplyPercentage: (asset.circulating_supply/asset.total_supply*100).toFixed(0),
                alertPricehigher: 0,
                isAlarmRinging: false        
              };
    
            });    
             
    } catch (error) {
            console.error('Coin fiyatları alınamadı:', error);
          }
        },

        async updateSabitCoinFiyatlari() {
      try {
        const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
          headers: {
            'X-CMC_PRO_API_KEY': 'a070384f-61d6-4a24-9e6c-63a7fd476698'
          }
        });
        const sabitCoinler = ['BTC', 'ETH', ]; 
        for (let coin of this.myList) {
          if (sabitCoinler.includes(coin.symbol)) {
              const asset = response.data.data.find(a => a.symbol === coin.symbol);
          if (asset && asset.quote && asset.quote.USD && asset.quote.USD.price) {
              coin.priceUsd = asset.quote.USD.price > 1000 ? Number(asset.quote.USD.price).toFixed(0)  : asset.quote.USD.price > 100 ? Number(asset.quote.USD.price).toFixed(1) : asset.quote.USD.price > 1? Number(asset.quote.USD.price).toFixed(2) : asset.quote.USD.price > 0.01  ? Number(asset.quote.USD.price).toFixed(4)  : asset.quote.USD.price > 0.00099 ? Number(asset.quote.USD.price).toFixed(6)  : Number(asset.quote.USD.price).toFixed(8) // Fiyatı güncelle
            }
          }
        }

        this.coinPrices = this.coinList.map(coin => ({ symbol: coin.symbol, priceUsd: coin.priceUsd }));
        this.coinPriceslower = this.coinList.map(coin => ({ symbol: coin.symbol, priceUsd: coin.priceUsd }));
        

      } catch (error) {
        console.error('Sabit coin fiyatları alınamadı:', error);
      }
    },
 
      },

      mounted() {

        this.audio = new Audio('/src/assets/alert.mp3');


        const vm = this; 
        window.addEventListener('click', (event) => {
        if (event.button === 0) { 
        vm.clickListener(); 
  }
});

        this.coinPrices = null;
   
        this.updateCoinPrices().then(() => {
            this.yay(); 
           
        });
        setInterval(this.updateCoinPrices, 220000); 
        
        
        this.myList.push({ id: '2', symbol: 'ETH', priceUsd: '' });
  
        this.updateSabitCoinFiyatlari();
        setInterval(this.updateSabitCoinFiyatlari, 220000);

      },

        beforeUnmount() {
 
        window.removeEventListener('click', this.clickListener);
}
     
    }    
 
      </script>
    
      <style scoped >
    
html, body {

margin: 0;
padding: 0;
z-index: 0;

}


.watchlist{

  position: relative;
  width: 100%;
  height: 100vh;
  background: red;

}
.coins {

  width: 200px;
  height: 200px;
  position: relative;
  border-radius: 50%;
  background-image: url('/src/assets/saat.webp');
  background-size: cover;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  margin: 100px;
  font-size:30px ;
  color: white;
  text-align: center;
  line-height: 53px;
  font-weight:bold;
  float: left;    
  justify-content: space-between;
  
   
}

.price{

  width:40%; 
  height:40%; 
  border-radius: 50%; 
  background-color: black;
  color: white; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  position: absolute;
  left: 30.5%;
  top: 37%;
  font-size: 31px;
}

.sil{

  position: absolute;
  top: 10%;
  right: -5%;
  background: black;
  color: rgb(241, 241, 211);
  width: 10%;
  height: 10%;
  border-radius: 5px;
  font-size: 12px;
    
}

.container{

  width: 100%;
  height: 94vh;
  background: red;
  margin-left: 120px;
  position: relative;
}

#addinput{

  margin-left: 100px;
  height: 30px;
  width: 150px;
  margin-bottom: 20px;
  position: absolute;
  top: 20.7%;
  left: 9%;
  color: aliceblue;
  border: 2px solid red; 
  

}

#addinput:focus{
  outline: 0;
  box-shadow: 0 12px 16px 0 rgba(95, 93, 93, 0.24), 0 17px 50px 0 rgba(109, 107, 107, 0.19);
}


#addbtn{
  width: 28px;
  height: 28px; 
  margin-bottom: 20px;
  position: absolute;
  top: 25%;
  left: 23.5%;
  background: rgb(32, 32, 32);
  border: 2px solid red;
}

#addbtn i{
  color: rgb(241, 241, 211);
  background: rgb(32, 32, 32);
  font-size: 20px;
}

.search{

  position: relative;
  width: 100%;
  height: 6vh;
}

.alertinputhigher{
  position: absolute;
  width:70px;
  height:30px;
  top: 110%;
  left: 48%;
  color: white;
  margin-left: 20px;

}

.alertbtnhigher{

  position: absolute;
  top: 110%;
  left: 99%;
  width: 30px;
  height: 30px;
  background: green;
}

#alertsymbolhigher{

  position: absolute;
  top: 106%;
  left: -5%;
  width: 120px;
  height: 50px;
  font-size: 35px;
  text-align: center;
  background: red;
  color: black;
  font-weight: bolder;
  letter-spacing: 2px;
  
}


.alertinputlower{
  position: absolute;
  width:70px;
  height:30px;
  top: 136%;
  left: 48%;
  color: white;
  margin-left: 20px;

}

.alertbtnlower{

  position: absolute;
  top: 136%;
  left: 99%;
  width: 30px;
  height: 30px;
  background: green;
}

#alertsymbollower{

  position: absolute;
  top: 132%;
  left: -5%;
  width: 120px;
  height: 50px;
  font-size: 35px;
  text-align: center;
  background: red;
  color: black;
  font-weight: bolder;
  letter-spacing: 2px;
  
}

#alarmHDiv {
  font-size: 67px;
  width: 300px;
  height: 40px;
  color: red;
  position: absolute;
  top: -1%;
  left: 45%;
  visibility: visible;
  animation: fadeInOut 0.9s linear infinite;
  letter-spacing: 20px;
  visibility: hidden;
  font-weight: bolder;
}

@keyframes fadeInOut {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}


.fa-circle-play {
  width: 100%;
  height: 100%;
  color: rgb(241, 241, 211);
  font-size: 27px;
}   
     
    
    </style>