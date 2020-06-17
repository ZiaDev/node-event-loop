let INNER_LOOP = 1000000;
const OUTER_LOOP = 10000;

module.exports = {
  longOperationSync: () => {
    for (let index = 0; index < OUTER_LOOP; index++) {
      for (let j = 0; j < INNER_LOOP ; j++) {
  
      }
    }
  },

  longOperationAsync: async () => {
    for (let j = 0; j < OUTER_LOOP; j++) {
      Promise.resolve().then(()=>{
        for (let index = 0; index < INNER_LOOP; index++) {}
  
      });
    }

  },

  longOperationWithTimeOut: () => {
    for (let index = 0; index < OUTER_LOOP; index++) {
      setTimeout(() => {
        for (let j = 0; j < INNER_LOOP ; j++) {}
      }, 0);
    }
  },

  longOperationWithSetImmediate: (outerCB) => {
        
    function help(i, cb) {
      for (let j = 0; j < INNER_LOOP; j++) {
      }
      if (i == OUTER_LOOP) {
        cb();
        return;
      }

      // "Asynchronous recursion".
      // Schedule next operation asynchronously.
      setImmediate(help.bind(null, i + 1, cb));
    }

    // Start the helper, with CB to call outerCB.
    help(1, function () {
      outerCB();
    });
  },
};
