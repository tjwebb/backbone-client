var _ = require('lodash');

module.exports = {

  /**
   * Return the total current hash rate of this MinerCollection
   *
   * @return hash rate in GH/s
   */
  getCurrentHashRate: function () {
    return this.reduce(function (total, miner) {
      return total + miner.getCurrentHashRate();
    }, 0);
  }
};
