const axios = require('axios');
const { getAccessToken } = require('../utils/UtilData'); 

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const baseURL = 'https://teleco.halopsa.com/api';

module.exports.data = async function(req,res){
    try{
        options = {
            'headers' : {'Authorization' : 'bearer ' + await getAccessToken(),}
        };

        const getSales = await axios.get(`https://teleco.halopsa.com/api/ReportData/98ad5e5f-5882-466f-9873-7d4dac43a90a`,options).then(res=>{
            return res.data;
        });

        res.send({data: getSales});
        
    }catch(error){
        console.log(error);
        res.render('404',{error: error})
    }
}

module.exports.index = async function(req,res){  
    
      try {
            res.render('sales');
    
          } catch (error) {
              console.log(error);
              res.render('404',{error: error});
          }

    }