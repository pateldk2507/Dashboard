const axios = require('axios');
const { getAccessToken } = require('../utils/UtilData'); 

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const baseURL = 'https://teleco.halopsa.com/api';

module.exports.index = async function(req,res){
  
  var datetime = new Date();
  let TODAY = datetime.toISOString().slice(0,10);

  const next6Days = new Date();
  next6Days.setDate(next6Days.getDate() + 7);

  const NEXTDAY = next6Days.toISOString().slice(0,10);

  try {
          options = {
             'headers' : {'Authorization' : 'bearer ' + await getAccessToken(),}
          };

          const getWeeklySchedule = await axios.get(`${baseURL}/appointment?start_date=${TODAY}&end_date=${NEXTDAY}&hidecompleted=true&showappointments=true&agents=24,29,27,28,22`,options).then(res=>{
              return res.data;
          });   
          
          const Agent = (localStorage.getItem('agent')) ? localStorage.getItem('agent') : await getAgents();

    
          res.render('week', {weeklyData: getWeeklySchedule, Agent : Agent.split(',')});

      } catch (error) {
          console.log(error);
          res.render('404',{error: error});
      }
          
}