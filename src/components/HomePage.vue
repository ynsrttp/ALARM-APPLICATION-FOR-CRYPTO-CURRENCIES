<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <div class="chart">
    <table id="table">
      <thead>
        <tr>
          
          <th @click="sortBy('name')">Coin Name</th>
          <th @click="sortBy('symbol')">Symbol</th>
          <th @click="sortBy('priceUsd')">Price (USD)</th>
          <th @click="sortBy('marketCap')">MarketCap</th>
          <th @click="sortBy('change24h')">Change 24h</th>
          <th @click="sortBy('change7d')">Change 7d</th>
          <th @click="sortBy('circulatingSupplyPercentage')">Circulating Supply</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coin in sortedCoinList" :key="coin.id">
          
          <td>{{ coin.name }}</td>
          <td>{{ coin.symbol }}</td>
          <td>{{ coin.priceUsd }}</td>
          <td>{{ coin.marketCap }}</td>
          <td><span v-if="coin.change24h > 0">
                  <i class="fa-solid fa-sort-up , green" style="color: green;"></i>
               </span>
               <span v-else>
                  <i class="fa-solid fa-sort-down" style="color: red;"></i>
               </span> {{ coin.change24h }}</td>
          <td> <span v-if="coin.change7d > 0">
                  <i class="fa-solid fa-sort-up , green" style="color: green;"></i>
               </span>
               <span v-else>
                  <i class="fa-solid fa-sort-down" style="color: red;"></i>
               </span>{{ coin.change7d }} </td>
          <td>%{{ coin.circulatingSupplyPercentage }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    coinList: Array
  },
  data() {
    return {
      sortKey: '',
      sortDirection: 1,
      
    };
  },
  computed: {
    sortedCoinList() {
      return this.coinList.slice().sort((a, b) => {
        if (a[this.sortKey] < b[this.sortKey]) {
          return -1 * this.sortDirection;
        }
        if (a[this.sortKey] > b[this.sortKey]) {
          return 1 * this.sortDirection;
        }
        return 0;
      });
    }
  },
  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortDirection *= -1;
      } else {
        this.sortKey = key;
        this.sortDirection = 1;
      }
    }
  }
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.chart {
  background-color: black;
  color: white; 
  width: 100%;      
  text-align: left;
  z-index: 1;
  margin-left: 100px;  
}

table {
  border-collapse: separate; 
  border-spacing: 20px; 
  border: 2px solid red;
  font-size: 27px;
  text-align: left;
  margin-left: 130px;  
}

td {
  border: 1px solid red; 
  padding: 10px; 
  text-align: center;
  position: relative;
}

th{
  border: 1px solid red; 
  padding: 10px; 
  color: black;
  background: rgb(172, 3, 3);
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}

td i{
  text-align: right;
  position: absolute;
  right: 79%; 
  top: 6%;
  
}

.green{

  text-align: right;
  position: absolute;
  right: 79%; 
  top: 30%;

}
</style>
