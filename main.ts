require('typescript-require');

import redis = require('redis');
import http = require('http');
import rpc = require('./lib/rpc');
import persist = require('./lib/persist');
import dummyData = require('./lib/dummyData');

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.writeHead(200);
        res.end();
        return;
    }

    persist.getIsStreamable(function (error: Error, isStreamable: boolean) {
        var
            statusCode = 500,
            result = {};
        if (!error) {
            statusCode = 200;
            if (isStreamable) {
                result = persist.getAllLivePlayerData();
            } else {
                statusCode = 403;
            }
        } else {
            console.log(error);
        }

        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });




}).listen(12302);

rpc.init();
dummyData.init();
