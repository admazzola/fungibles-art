
  

import axios from 'axios'
 
import Web3 from 'web3'

import FileHelper from './file-helper.js'


const UniswapPairABI = FileHelper.readJSONFile('./market-api-server/abi/UniswapV2Pair.json')

    export default class CoinDataCollector  {
    
        constructor( web3, assetConfig,  mongo ){
            
            this.mongoInterface = mongo
            this.assetConfig = assetConfig  

            this.web3 = web3
           
        }

        
        getMongo( ){
             

            return this.mongoInterface 
        }

        init( ) {

            

            this.fetchData( )
            setInterval(this.fetchData, 300*1000)
        }

        async fetchData( ){
            console.log('fetching data')

           
            for(let assetData of this.assetConfig){  

                let sushiPairContract = new this.web3.eth.Contract(UniswapPairABI,assetData.sushiPair)

                let response = await sushiPairContract.methods.getReserves().call()

               
                
 
                Object.assign( assetData,  response)

                console.log('assetData', assetData )

                //save to mongo ! 

                 await this.mongoInterface.upsertOne('coindata',{contractAddress: assetData.contractAddress},assetData)


            }
        

        }
    
         
    }