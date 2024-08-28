const axios = require('axios');
const { getAccessToken } = require('../utils/UtilData'); 

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const baseURL = 'https://teleco.halopsa.com/api';

module.exports.index = async function(req,res){  
    ;

      try {


          } catch (error) {
              console.log(error);
              res.render('404',{error: error});
          }

    }