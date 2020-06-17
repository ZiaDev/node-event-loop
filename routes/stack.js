const express = require("express");
let router = express.Router();

const {
  longOperationSync,
  longOperationAsync,
  longOperationWithTimeOut,
  longOperationWithSetImmediate
} = require("../main/stack");

const { getTime } = require("../main/utli");

/* GET users listing. */
router.get("/", function (req, res, next) {
  logs();
  res.render("stack");
});

router.get("/renderasync", function (req, res, next) {
  res.render("stack-long-asyc");
});

router.get("/rendertimeout", function (req, res, next) {
  res.render("stack-long-timeout");
});

router.get("/renderimmediate", function (req, res, next) {
  res.render("stack-long-immediate");
});



router.get("/longoperationsync", function (req, res, next) {
  const receivedTime = getTime();
  longOperationSync();
  const responseTime = getTime();
  res.send({ receivedTime, responseTime });
});

router.get("/longoperationasync", async function (req, res) {
  const receivedTime = getTime();
   longOperationAsync();
    const responseTime = getTime();
    res.send({ receivedTime, responseTime });
});

router.get("/longoperationtimeout", async function (req, res) {
  const receivedTime = getTime();
   longOperationWithTimeOut();
   const responseTime = getTime();
   res.send({ receivedTime, responseTime });
});

router.get("/longoperationimmediate", async function (req, res) {
  const receivedTime = getTime();
  longOperationWithSetImmediate(()=>{
    console.log('longoperationImmediate Finished');

  });
   const responseTime = getTime();
   res.send({ receivedTime, responseTime });
});



router.get("/simpleoperation", function (req, res, next) {
  let receivedTime = getTime();
  let clientSentAt = req.query.time;
  let responseTime = getTime();
  res.send({ receivedTime, responseTime, clientSentAt });
});

let logs = () => {

  console.log("A");
  console.log("B");
  console.log("C");

  setTimeout(() => {
    console.log("D");
  }, 0);


  Promise.resolve().then(()=>{
    console.log('Starting Now');
  });

  console.log("F");

};




module.exports = router;
