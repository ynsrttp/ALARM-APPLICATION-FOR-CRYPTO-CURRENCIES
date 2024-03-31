<template>
  <div class="watchlist">  
    <div class="search">  
  <input v-model="xtext" ref="searchInput" @keydown.enter="eklex" id="addinput" type="text" placeholder=" Coin Name" maxlength="10" >
  <span class="clear-search" @click="clearSearch">✖</span>
  <button @click="eklex"  id="addbtn"><i class="fa-solid fa-magnifying-glass"></i></button>    
   </div>     
     <div @mousemove="yay(myList)" class="container">
       <div v-for="list in myList"   class="coins">  
        <h2 id="symbol">{{list.symbol}}</h2>  
          <h1 class="price"> {{list.priceUsd}}</h1>          
          <h3 id="change24h" :style="{ color: list.change24h > 0 ? 'green' : (list.change24h < 0 ? 'red' : 'black') }">%{{ list.change24h }}</h3>  
               <button @click="coinisil(list)" class="sil" >X</button>         
       </div>
   </div>
  </div> 
    </template>
    
    <script>
    import axios from 'axios';
    
    export default {
      data() {
        return { 
          
          myList:[ { id: '1', name:'BİTCOİN', symbol: 'BTC', priceUsd: '', change24h:''}],
          coinList:[{id:'', name:'', symbol:'',priceUsd:'', change24h:''}],
          xtext: null,
          response:[]                
        };
      },     
  
      methods : {
        coinisil(list){
          if(this.myList.length>3){

          this.myList = this.myList.filter(t => t !== list)}   
            
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
              circulatingSupplyPercentage: (asset.circulating_supply/asset.total_supply*100).toFixed(0)        
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
      const sabitCoinler = ['BTC', 'ETH', 'BNB', 'SOL','AVAX']; 
      for (let coin of this.myList) {
        if (sabitCoinler.includes(coin.symbol)) {
          const asset = response.data.data.find(a => a.symbol === coin.symbol);
          if (asset && asset.quote && asset.quote.USD && asset.quote.USD.price && asset.quote.USD.percent_change_24h) {
            coin.priceUsd = asset.quote.USD.price > 1000 ? Number(asset.quote.USD.price).toFixed(0)  : asset.quote.USD.price > 100 ? Number(asset.quote.USD.price).toFixed(1) : asset.quote.USD.price > 1? Number(asset.quote.USD.price).toFixed(2) : asset.quote.USD.price > 0.01  ? Number(asset.quote.USD.price).toFixed(4)  : asset.quote.USD.price > 0.00099 ? Number(asset.quote.USD.price).toFixed(6)  : Number(asset.quote.USD.price).toFixed(8) // Fiyatı güncelle
            coin.change24h = asset.quote.USD.percent_change_24h.toFixed(1);
          }
        }
      }
    } catch (error) {
      console.error('Sabit coin fiyatları alınamadı:', error);
    }
  },  
    }, 
  
    mounted() {
      
      this.updateCoinPrices().then(() => {
          this.yay(); 
         
      });
      setInterval(this.updateCoinPrices, 200000); 
      
      this.myList.push({ id: '2', symbol: 'ETH', priceUsd: '', change24h:'' });
      this.myList.push({ id: '4', symbol: 'BNB', priceUsd: '', change24h:'' });
      this.myList.push({ id: '5', symbol: 'SOL', priceUsd: '', change24h:''});
      this.myList.push({ id: '9', symbol: 'AVAX', priceUsd: '', change24h:'' }); 
     
      this.updateSabitCoinFiyatlari();
      setInterval(this.updateSabitCoinFiyatlari, 200000);    
  
    }
  }      
  
    </script>
  
    <style scoped >
  
  html, body {
      margin: 0;
      padding: 0;
      z-index: 0;
      
  }
  
    .coins{
      color: red;
      width: 110px;
      height: 110px;
      position: relative;      
      left: 100px;
      overflow: hidden;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      border: 5px outset red;
      padding: 15px;
      margin: 70px;
      float: left;    
      justify-content: space-between;
      background-image: url('/src/assets/tv.png');
      background-size: cover;    
  
    }
  
    .price{
  
      position: absolute;
      color: red;
      text-align: center;
      font-size: 27px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      margin-top: 10px;
      background: white;
      top: 37%;
      left: 30%;    
      font-weight: bolder;      
  
    }
  
    .sil{
      background: red;
      position: absolute;
      top: 0;
      right: 0;
      font-weight: bold;
    }
  
    .container{
  
      position: relative;       
     
    }
  
    
  #addinput{
  
    margin-left: 100px;
    height: 30px;
    width: 150px;
    margin-bottom: 20px;
    position: absolute;
    bottom: 158%;
    left: -63%;
    color: rgb(47, 48, 49);
    border: 2px solid red;
    background: white;
    text-indent: 9px;
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
    bottom: 164%;
    right: 121%;
    background: white;
    border: 2px solid red;
    z-index: 111112;
  }
  
  #addbtn i{
    color: rgb(161, 157, 157);
    background: white;
    font-size: 17px;
  }  
  
  
  #addbtn:disabled {
  pointer-events: none;
  }
  
  #addbtn:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
  }
  
  #addbtn:active {
  box-shadow: none;
  transform: translateY(0);
  } 
  
  
  #addbtn:hover {
  background-color: black; 
  color: white;
  
  }
  .watchlist{
  
  position: relative;
  width: 1700px;
  height: 100vh;
  margin-left: 120px;
  background: white;
  margin-top: 100px;  
  float: left;
  
  }
  
  .clear-search {
  position: absolute;
  right: 126.4%; 
  bottom: 232%;
  transform: translateY(-50%);
  color: rgb(61, 60, 60); 
  cursor: pointer;
  font-size: 12px;
  opacity: 0.7;
  background: white;
  
  }
  
  .search{
    position: relative;
    width: 40%;
    height: 4%;
    margin-top: 2%;
    margin-left:27%;
    background: white;
  }
  
  #symbol{
  
    position: absolute;
    top:0%;
    color: red;
    z-index: 10000;
    font-size: 20px;
    left: 36%;
    background: white;
    height: 10px;
  }
  
  #change24h{
    position: absolute;
    top:65%;
    color: red;
    z-index: 10001;
    font-size: 18px;
    left: 35%;
    background: white;
    height: 10px;
    width:20px;
    text-align: center;  
  
  }  
  
  </style>