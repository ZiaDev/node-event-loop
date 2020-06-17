module.exports = {
  getTime: () => {
    return `${new Date().getHours()}: ${new Date().getMinutes()}: ${new Date().getSeconds()}: ${new Date().getMilliseconds()}`;
  },
};
