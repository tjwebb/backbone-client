var _ = require('lodash');
var najax = require('najax');

najax.defaults({
  url: {
    hostname: 'localhost',
    port: '1337',
    protocol: 'http'
  },
  headers: {
    Authorization: 'Basic YWRtaW46YWRtaW4xMjM0'  // encoding of default admin user/pass
  }
});

global.Backbone = require('backbone');
global.Backbone.$ = { ajax: najax };
require('backbone-relational');
require('backbone-validation');

var util = require('util');
var assert = require('assert');
var API = require('../');
var HASHWARE_BASEURL = 'http://localhost:1337';
var HASHWARE_BACKBONEMODELS_URL = HASHWARE_BASEURL + '/api/v1/backbonemodel';

describe('hashware-backbone-client', function () {
  describe('#create', function () {
    this.timeout(60 * 1000);

    before(function (done) {
      API.create(HASHWARE_BACKBONEMODELS_URL)
        .then(function (api) {
          global.hashware = api;
          require('./models');
          require('./collections');
          done();
        })
        .catch(function (error) {
          done(error);
        });
    });

    it('can instantiate Miner', function () {
      var miner = new hashware.Miner();
      assert(_.isObject(miner));
      assert(miner instanceof hashware.Miner);
    });
    it('can instantiate MinerState', function () {
      var state = new hashware.MinerState();
      assert(_.isObject(state));
      assert(state instanceof hashware.MinerState);
    });
    it('can instantiate Group', function () {
      var group = new hashware.Group();
      assert(_.isObject(group));
      assert(group instanceof hashware.Group);
    });
    it('can instantiate Group', function () {
      var worker = new hashware.PoolWorker();
      assert(_.isObject(worker));
      assert(worker instanceof hashware.PoolWorker);
    });
  });
});
