


import MongoInterface from './lib/mongo-interface.js'
 

import FileHelper from './lib/file-helper.js'

import ApiInterface from './lib/api-interface.js'
 import CoinDataCollector from './lib/coin-data-collector.js'

import Web3 from 'web3'

let envmode = process.env.NODE_ENV

let serverConfigFile = FileHelper.readJSONFile('./market-api-server/serverconfig.json')
let serverConfig = serverConfigFile[envmode]

let assetConfig = FileHelper.readJSONFile('./market-api-server/assetconfig.json')
 


  async function start(){

    console.log('server config: ',serverConfig)


    let mongoInterface = new MongoInterface( serverConfig.dbName ) 

  
     

    let web3 = new Web3( serverConfig.web3provider  )

    let coinDataCollector = new CoinDataCollector(web3, assetConfig,mongoInterface)

    coinDataCollector.init(  ) 

     
    let apiInterface = new ApiInterface(web3,mongoInterface , serverConfig )
      
    
     
 


}

 
 start()