<template>

  <div style="width: 100%;" class="watchlist">
  
    <div class="search">
  
  <input v-model="xtext" ref="searchInput" @keydown.enter="eklex" id="addinput" type="text" placeholder=" Coin Name" maxlength="10" >
  <span class="clear-search" @click="clearSearch">✖</span>
  <button @click="eklex"  id="addbtn"><i class="fa-solid fa-magnifying-glass"></i></button>
  <div><h1 id="totalbalance">Total Balance : {{ totalBalance }} $</h1></div>

   </div>
     <div @mousemove="yay(myList)" class="container">    
<table>
  <thead>
    <tr>
      <th style="width: 1.1%;"><i style="color: black; background: none;" class="fa-solid fa-eye-dropper"></i></th>
      <th style="width: 2.8%;">Index</th>
      <th style="width: 14.55%;">Symbol</th>
      <th style="width: 14.59%;">Current Price</th>
      <th style="width: 27.88%;">Purchase Price</th>
      <th style="width: 27.88%;">Purchased Amount</th>
      <th style="width: 14.46%;">Cost</th>
      <th style="width: 20%;">Current Total Balance</th>
      <th style="width: 14.56%;">Profit/Loss Ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(list, index) in myList" :key="index">
      <td style="width: 2%;"><button @click="deleteRow(index)" class="sil" >X</button></td>
      <td style="width: 5%;">{{ index + 1 }}</td>
      <td style="width: 16%;">{{ list.symbol }}</td>
      <td style="width: 16%;">{{ list.priceUsd }}</td>
      <td style="width: 12%;"><input class="chartinput" @keyup.enter="resetPurchasePrice(list)" type="number" v-model="list.purchasePrice"></td>
      <td style="width: 16%;">{{ list.price }}</td>
      <td style="width: 12%;"><input class="chartinput" @keyup.enter="resetPurchasedAmount(list)" type="number" v-model="list.purchasedAmount"></td>
      <td style="width: 16%;">{{list.amount}}</td>
      <td style="width: 16%;">{{ list.cost }}</td>
      <td style="width: 22%;">{{list.currentTotalBalance}}</td>
      <td style="width: 16%;">%{{ list.profit }}</td>
      
    </tr>
  </tbody>
</table>
    </div>
  </div>
   
    </template>
    
    <script>
    import axios from 'axios';
    
    export default {
      data() {
        return { 
          
          myList:[ ],
          coinList:[{id:'', name:'', symbol:'',priceUsd:'', purchasePrice:'', purchasedAmount:'', price:'', amount:'', cost:'', currentTotalBalance:'', profit:''}],
          xtext: null,
          response:[],
          price:'',
          amount:'',
          cost:'',
          currentTotalBalance:'',
          profit:''
                
        };
      },

      computed: {
  totalBalance() {
    return this.myList.reduce((total, item) => total + parseFloat(item.currentTotalBalance), 0);
  }
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

    deleteRow(index) {
    this.myList.splice(index, 1);
  },

  clearSearch(){
  this.$refs.searchInput.value = '';
  
  },

  resetPurchasePrice(list) {   
    
    list.price=list.purchasePrice;
    list.purchasePrice = '';
    if(list.amount !== null  && list.price !== null ){
    list.cost=list.price*list.amount;
    list.currentTotalBalance=list.priceUsd*list.amount;
    list.profit=(list.currentTotalBalance - list.cost)/list.cost;
    list.profit=list.profit.toFixed(0);
    this.totalBalance;    
  } 

  },

  resetPurchasedAmount(list) {   
  
    list.amount=list.purchasedAmount;
    list.purchasedAmount=''   
    if(list.amount !== null  && list.price !== null ){
    list.cost=list.price*list.amount;
    list.currentTotalBalance=list.priceUsd*list.amount;
    list.profit=100*(list.currentTotalBalance - list.cost)/list.cost;
    list.profit=list.profit.toFixed(0);
    this.totalBalance;  
 
  }   
  },

  totalBalance() {
  return this.myList.reduce((total, item) => {
       const currentTotalBalance = parseFloat(item.currentTotalBalance);
    return isNaN(currentTotalBalance) ? total : total + currentTotalBalance;
  }, 0);
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
          if (asset && asset.quote && asset.quote.USD && asset.quote.USD.price) {
            coin.priceUsd = asset.quote.USD.price > 1000 ? Number(asset.quote.USD.price).toFixed(0)  : asset.quote.USD.price > 100 ? Number(asset.quote.USD.price).toFixed(1) : asset.quote.USD.price > 1? Number(asset.quote.USD.price).toFixed(2) : asset.quote.USD.price > 0.01  ? Number(asset.quote.USD.price).toFixed(4)  : asset.quote.USD.price > 0.00099 ? Number(asset.quote.USD.price).toFixed(6)  : Number(asset.quote.USD.price).toFixed(8) // Fiyatı güncelle
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
  width: 150px;
  height: 70px;
  position: relative;
  top: 28.5%;
  left: 100px;
  overflow: hidden;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  border: 7px solid red;
  padding: 15px;
  margin: 70px;
  float: left;    
  justify-content: space-between;    
  
}
  
.price{
  
  color: aliceblue;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 10px;      
  
}
  
.sil{

  background: none;
  position: absolute;
  top: 10%;
  right: 0;
  font-weight: bold;
  width: 33px;
  height: 33px;
  font-size: 22px;
  color: red;

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
  top: 10%;
  left: -76%;
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
  top: 12%;
  left: -36%;
  background: rgb(32, 32, 32);
  border: 2px solid red;

}

#addbtn i{
  color: rgb(241, 241, 211);
  background: rgb(32, 32, 32);
  font-size: 20px;

}

#addinput:focus{

  outline: 0;
  box-shadow: 0 12px 16px 0 rgba(95, 93, 93, 0.24), 0 17px 50px 0 rgba(109, 107, 107, 0.19);
  
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
  
.watchlist{
  
  position: relative;
  width: 100%;
  height: 100vh;
  margin-left: 20px;
  
}
  
.clear-search {

  position: absolute;
  left: -39.3%; 
  top: 17%;
  transform: translateY(-50%);
  color: white; 
  cursor: pointer;
  font-size: 12px;
  opacity: 0.5;
 
}
  
.search{

  position: relative;
  width: 40%;
  height: 15%;
  margin-top: 4%;
  margin-left:27%;
 
}

#totalbalance{

  color: red;
  text-align: center;
  position: absolute;
  top: 20%;
  left: 10%;
  z-index: 1200;
  width: 80%;
  font-size: 35px;  

}

ul {

  border-left: 3px solid rgb(185, 13, 13);
  padding-left: 10px; 

}

ul li {

  border-bottom: 3px solid rgb(209, 28, 28);
  padding: 5px 0; 
  display: flex;
  
}

.container span {

  border-right: 3px solid red;
  padding-right: 10px; 
  margin-right: 10px;

}

.container span:last-child {

  border-right: 3px solid red;
  margin-right: 0; 

}

table{

  border-collapse:collapse;
  border-spacing:10px;
  table-layout: fixed;
  overflow: hidden;
  width: 90%;

}

tr{
  
  display: flex;
  
}


td{

  float: left;
  width: 10%;
  color: aliceblue;
  font-size: 17px;
  border: 1px solid red; 
  padding: 10px; 
  text-align: center;
  position: relative;

}

th{

  font-size: 18px;
  text-align: center;
  width: 12.5%;
  white-space: nowrap;
  font-weight: bolder;
  height: 24px;
  transform: scaleY(1.3);  
  border: 1px solid red; 
  padding: 10px; 
  color: black;
  background: rgb(172, 3, 3);
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}

.chartinput{

  width: 90%;
  height: 100%; 
  color: white;
  margin-bottom: 5px;

}
  
  
  </style>