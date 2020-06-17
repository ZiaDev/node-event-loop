var express = require("express");
var router = express.Router();
const max = 1000;

/* GET home page. */
router.get("/", function(req, res, next) {
  let q = 0;
  let a = 0;

  ImmediateLoop();
  TimeOutLoop();

  function ImmediateLoop() {
    if (q !== max) {
      setImmediate(() => {
        console.log("Set Immedidate index: ", q);
        console.log(getTime());
        q++;
        ImmediateLoop();
      });
    }
  }

  function TimeOutLoop() {
    if (a !== max) {
      setTimeout(() => {
        console.log("Set timeout index: ", a);
        console.log(getTime());
        a++;
        TimeOutLoop();
      });
    }
  }

  res.render("index", { title: getTime() });
});
router.get("/abc", function(req, res, next) {
  res.render("index", { title: getTime() });
});

router.get("/promise", function(req, res, next) {
  let p = 0;
  PromiseResolver();
  function PromiseResolver() {
    if (p !== 1000000) {
      console.log("Promise Index: ", p);
      p++;
      Promise.resolve().then(() => {
        PromiseResolver();
      });
    }
  }
  res.render("index", { title: getTime() });
});

router.get("/promiseall", function(req, res, next) {
  let p = 0;
  let q = 0;
  let arr = [];
  function getPromise() {
    return Promise.resolve().then(() => {
      console.log("q: ", q);
     console.log(getTime());
      q++;
    });
  }
  PromiseResolver();

  function PromiseResolver() {
    for (let i = 0; i < 100000; i++) {
      arr.push(getPromise());
    }
  }

  Promise.all(arr).then(() => {
    console.log("all work finished");
  });

  res.render("index", { title: getTime() });
});

function getTime() {
  return `execution Time , ${new Date().getMinutes()}: ${new Date().getSeconds()}: , ${new Date().getMilliseconds()}`;
}

module.exports = router;
