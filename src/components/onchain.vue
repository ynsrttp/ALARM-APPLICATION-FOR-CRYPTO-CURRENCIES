<template>
    <div id="tablechart">
       <div id="itemlist" v-for="item in itemslist" >
        <td>
            <tr><td>{{ item.CoinDate }}</td></tr>
            <tr><td>{{ item.Btc }}</td></tr>
            <tr><td>{{ item.BtcRealizePrice }}</td></tr>
            <tr><td>{{ item.mvrv }}</td></tr>
            <tr><td>{{ item.zscore }}</td></tr>
            <tr><td>{{ item.sthsopr7d }}</td></tr>
            <tr><td>{{ item.lthsopr30d }}</td></tr>
            <tr><td>{{ item.mpi14d }}</td></tr>
            <tr><td>{{ item.puellmultiple }}</td></tr>
            <tr><td>{{ item.binarycdd }}</td></tr>
            <tr><td>{{ item.dormancyflow }}</td></tr>
            <tr><td>{{ item.mayermultiple }}</td></tr>
            <tr><td>{{ item.nupl }}</td></tr>
            <tr><td>{{ item.total }}</td></tr>
        </td>   
           
      </div>  

      <div id="onchaintables">        

        <td v-for="tables in onchaintables">
         <tr>
           <th><td>{{ tables.date }}</td></th>
         </tr>
           <tr><td>{{ tables.BTCPrice }}</td></tr>
           <tr><td>{{ tables.BtcRealize }}</td></tr>
           <tr><td>{{ tables.mvrvratio }}</td></tr>
           <tr><td>{{ tables.zscore }}</td></tr>
           <tr><td>{{ tables.sthsopr7d }}</td></tr>
           <tr><td>{{ tables.lthsopr30d }}</td></tr>
           <tr><td>{{ tables.mpi14d }}</td></tr>
           <tr><td>{{ tables.puellmultiple }}</td></tr>
           <tr><td>{{ tables.binarycdd }}</td></tr>
           <tr><td>{{ tables.dormancyflow }}</td></tr>
           <tr><td>{{ tables.mayermultiple }}</td></tr>
           <tr><td>{{ tables.nupl }}</td></tr>
           <tr><td>{{ tables.total }}</td></tr>      
          </td> 
      </div>            
    </div>

</template>

<script>
export default {
  data() {
    return {
      onchaintables: [
        {
          date: '2017 DECEMBER',
          BTCPrice: '19666',
          BtcRealize: '4072',
          mvrvratio: '4.83',
          zscore: '9.01',
          sthsopr7d: '1.14',
          lthsopr30d: '12.9',
          mpi14d: '2.47',
          puellmultiple: '6.17',
          binarycdd: '1',
          dormancyflow: '1.99',
          mayermultiple: '3.5',
          nupl: '0.77',
          total: '43.78'
        },
        
        {
          date: '2018 DECEMBER',
          BTCPrice: '3122',
          BtcRealize: '4460',
          mvrvratio: '0.7',
          zscore: '-0.45',
          sthsopr7d: '0.93',
          lthsopr30d: '0.48',
          mpi14d: '-0.9',
          puellmultiple: '0.33',
          binarycdd: '0.63',
          dormancyflow: '0.19',
          mayermultiple: '0.52',
          nupl: '-0.43',
          total: '2'
        },
        {
          date: '2019 JUNE',
          BTCPrice: '13880',
          BtcRealize: '5359',
          mvrvratio: '2.59',
          zscore: '2.72',
          sthsopr7d: '1.08',
          lthsopr30d: '2.35',
          mpi14d: '3.22',
          puellmultiple: '2.27',
          binarycdd: '0.6',
          dormancyflow: '0.93',
          mayermultiple: '2.48',
          nupl: '0.58',
          total: '18.82'
        },
        {
          date: '2020 MARCH',
          BTCPrice: '3850',
          BtcRealize: '4278',
          mvrvratio: '0.9',
          zscore: '-0.15',
          sthsopr7d: '0.91',
          lthsopr30d: '0.81',
          mpi14d: '-0.56',
          puellmultiple: '0.57',
          binarycdd: '0.43',
          dormancyflow: '026',
          mayermultiple: '0.59',
          nupl: '-0.17',
          total: '3.59'
        },
        
        {
          date: '2021 FEBRUARY',
          BTCPrice: '64895',
          BtcRealize: '16305',
          mvrvratio: '3.98',
          zscore: '7.01',
          sthsopr7d: '1.09',
          lthsopr30d: '7.77',
          mpi14d: '2.47',
          puellmultiple: '2.79',
          binarycdd: '0.9',
          dormancyflow: '0.95',
          mayermultiple: '2.73',
          nupl: '0.74',
          total: '30.52'
        },
        {
          date: '2022 NOVEMBER',
          BTCPrice: '16200',
          BtcRealize: '20200',
          mvrvratio: '0.8',
          zscore: '-0.28',
          sthsopr7d: '0.98',
          lthsopr30d: '0.63',
          mpi14d: '-0.22',
          puellmultiple: '0.52',
          binarycdd: '0.57',
          dormancyflow: '0.16',
          mayermultiple: '0.72',
          nupl: '-0.24',
          total: '3.64'
        },
        {
          date: "   TODAY'S DATA  ",
          BTCPrice: '64000',
          BtcRealize: '26900',
          mvrvratio: '2.38',
          zscore: '2.67',
          sthsopr7d: '1.01',
          lthsopr30d: '2.45',
          mpi14d: '1.15',
          puellmultiple: '1.99',
          binarycdd: '0.77',
          dormancyflow: '1.1',
          mayermultiple: '1.58',
          nupl: '0.6',
          total: '15.7'
        }     
     
      ],
      itemslist: [
          {
            CoinDate: 'Date',
            Btc: 'BTC Price',
            BtcRealizePrice: 'Realize Price',
            mvrv: 'MVRV Ratio',
            zscore: 'MVRV Z-Score',
            sthsopr7d: 'STH SOPR (7d)',
            lthsopr30d: 'LTH SOPR (30d)',
            mpi14d: 'MPI(14d)',
            puellmultiple: 'PUELL MULTIPLE(14d)',
            binarycdd: 'BINARY CDD(30d)',
            dormancyflow: 'DORMANCY FLOW(7d)(m)',
            mayermultiple: 'MAYER MULTIPLE',
            nupl: 'NUPL(7d)',
            total: 'TOTAL POINTS'
          }
        ]
    };
  }
};
</script>

<style scoped>

#tablechart{

  position: absolute;
  left: 9%;
  top: 15%;
  display: flex;
  background: white;
  height: 500px;
  width: 500px; 
  height: 700px; 
  margin-right: 200px;
}

#onchaintables td {
  border: 1px solid rgb(189, 163, 163); 
  padding: 10px; 
  text-align: center;
  position: relative;
  font-size: 19.3px;
  white-space: nowrap;
  width: 220px;
  color: white;
}

#onchaintables  th tr td{

  color: red;

}

#itemlist{

  width: 200px; 
  height: 20px;  
  position: absolute; 
  top: 1%;

}

#itemlist td{
  width: 300px; 
  height: 20px; 
  color: red;
  background: rgb(241, 218, 218);
  font-weight: bolder;
  font-size: 19.3px;
  border: 1px solid rgb(17, 17, 17); 
  padding: 10px; 
  white-space: nowrap;
  text-align: center;
}

#onchaintables{
  margin-left: 180px; 
  position: absolute; 
  top: 1%; 
  margin-left: 285px;
}
</style>
