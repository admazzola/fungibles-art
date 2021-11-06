<template>

<div>

   <div class="section  bg-gray-900 border-b-2 border-black px-0 lg:px-1">

     <div class=" ">
        <Navbar 
        v-bind:web3Plug="web3Plug"
       />
     </div>


   </div>

  
   <div class="section  bg-gray-800  border-b-2 border-black   ">
     <div class=" w-container">
       <div class="w-row">

       </div>
       <div class="w-row">

         


         <div class="column w-col w-col-6 mt-8 py-8">
           


            <div >

               


                <AssetPricesTable
                v-bind:coinDataArray="allCoinData"
                
               />

             

           
           </div>
 

         </div>






        
       </div>
     </div>
   </div>

 
 

    
  <Footer/>

</div>
</template>


<script>

/*

v-bind:rowsArray="salesRowsArray"
                v-bind:clickedRowCallback="clickedSalesRowCallback"

*/


import Web3Plug from '../js/web3-plug.js' 

 
import Navbar from './components/Navbar.vue';
 
import Footer from './components/Footer.vue';
import TabsBar from './components/TabsBar.vue';
import AssetPricesTable from './components/AssetPricesTable.vue';
 
import BidPacketHelper from '../js/bidpacket-helper.js'




import StarflaskApiHelper from '../js/starflask-api-helper.js' 

export default {
  name: 'Home',
  props: [],
  components: {Navbar, Footer, TabsBar, AssetPricesTable },
  data() {
    return {
      web3Plug: new Web3Plug() ,
      activePanelId: null,
      
       

      allCoinData:[]

      
    }
  },

  created(){

 
    this.web3Plug.getPlugEventEmitter().on('stateChanged', function(connectionState) {
        console.log('stateChanged',connectionState);
         
        this.activeAccountAddress = connectionState.activeAccountAddress
        this.activeNetworkId = connectionState.activeNetworkId

        
         
         
        this.fetchCoinData()
       
         
      }.bind(this));
   this.web3Plug.getPlugEventEmitter().on('error', function(errormessage) {
        console.error('error',errormessage);
         
        this.web3error = errormessage
       
      }.bind(this));

      this.web3Plug.reconnectWeb()

         
       
        
      this.fetchCoinData()
     

  },
  mounted: function () {
    
   
   
  }, 
  methods: {
          setActivePanel(panelId){
              if(panelId == this.activePanelId){
                this.activePanelId = null;
                return 
              }
               this.activePanelId = panelId ;
          },
          onTabSelect(tabname){
            console.log(tabname)

              this.selectedTab = tabname.toLowerCase()


          },
          async fetchCoinData(){

            
               let inputData = {requestType: 'all_coin_data', input: {   } } 

               let response = await StarflaskApiHelper.resolveStarflaskQuery("https://api.starflask.com/api/v1/testapikey", inputData)


                let coinDataArray = response.output 

                coinDataArray.map(x => x.priceRatio = x._reserve0 / x._reserve1)


                 coinDataArray.sort(function(a, b) {
                  return b.priceRatio - a.priceRatio;
                })

                this.allCoinData = coinDataArray





               console.log('meep',  this.allCoinData )




            /* this.bidRowsArray.sort(function(a, b) {
              return b.currencyTokenAmount - a.currencyTokenAmount;
            })*/
          },

         

  }
}
</script>
