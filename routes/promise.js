let express = require('express');
let router = express.Router();


router.get('/unnessecarycallback', function(req, res, next) {
    let receivedTime = getTime();
    const pArray = [];
    for (let index = 0; index < 100000; index++) {
      pArray.push(unessaryResolutions());
      
    }
    Promise.all(pArray).then(()=>{
      let responseTime = getTime();
      res.send( { receivedTime, responseTime});
    })
  });
  
  router.get('/simplecallback', function(req, res, next) {
    let receivedTime = getTime();
    const pArray = [];
    for (let index = 0; index < 100000; index++) {
      pArray.push(promiseCallback());
      
    }
    Promise.all(pArray).then((resultArr)=>{
      console.log(resultArr)
      let responseTime = getTime();
      res.send( { receivedTime, responseTime});
    })
  });

router.get('/inconsistent', function(req, res, next) {
    let receivedTime = getTime();
    inconsistent(req.query.foo).then(()=>{
        let responseTime = getTime();
        res.send( { receivedTime, responseTime});
    })
  });

  router.get('/consistent', function(req, res, next) {
    let receivedTime = getTime();
    consistent(req.query.foo).then(()=>{
        let responseTime = getTime();
        res.send( { receivedTime, responseTime});
    })
  });

let unessaryResolutions = ()=>{
    return wrapperPromiseCallback().then((data)=>{
      return data;
    })
  }
  
  let wrapperPromiseCallback = ()=>{
    return promiseCallback().then((data)=>{
      return data;
      
    })
  }
  
  let promiseCallback =()=>{
    let promise = new Promise((resolve,reject)=>{
        resolve({data:{foo:'foo'}});
    });
    return promise;
  }

  let inconsistent = (param)=>{
      if(param)
       {
           return Promise.resolve('Resolved');
       }
       
  }

  let consistent = async (param)=>{
    if(param)
     {
         return Promise.resolve('Resolved');
     }
  }

  function getTime() {
    return `${new Date().getHours()}: ${new Date().getMinutes()}: ${new Date().getSeconds()}: ${new Date().getMilliseconds()}`;
  }
  
  module.exports = router;