#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var bodyParser = require('body-parser');
var fs    = require('fs');
var mongoose = require('mongoose');
var routes = require('./routes.js');

/**
 *  Define the sample application.
 */
var AppServer = function() {

  //  Scope.
  var self = this;


  /*  ================================================================  */
  /*  Helper functions.                         */
  /*  ================================================================  */

  /**
   *  Set up server IP address and port # using env variables/defaults.
   */
  self.setupVariables = function() {
    //  Set the environment variables we need.
    self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
    self.port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

    if (typeof self.ipaddress === "undefined") {
      //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
      //  allows us to run/test the app locally.
      console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
      self.ipaddress = "127.0.0.1";
    };
  };

  self.setupMongoose = function(){
    self.url = '127.0.0.1:27017/hgcb';

    // if OPENSHIFT env variables are present, use the available connection info:
    if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    self.url = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
    }

    mongoose.connect(self.url, function(err) {
    if(err) {
      console.warn('connection error', err);
    } else {
      console.warn('connection successful');
    }
    });

    mongoose.connection.on('error', function(error){
      console.log("Error loading the db - "+ error);
    });
  };

  /**
   *  terminator === the termination handler
   *  Terminate server on receipt of the specified signal.
   *  @param {string} sig  Signal to terminate on.
   */
  self.terminator = function(sig){
    if (typeof sig === "string") {
       console.log('%s: Received %s - terminating sample app ...',
             Date(Date.now()), sig);
       process.exit(1);
    }
    console.log('%s: Node server stopped.', Date(Date.now()) );
  };


  /**
   *  Setup termination handlers (for exit and a list of signals).
   */
  self.setupTerminationHandlers = function(){
    //  Process on exit and signals.
    process.on('exit', function() { self.terminator(); });

    // Removed 'SIGPIPE' from the list - bugz 852598.
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
     'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function(element, index, array) {
      process.on(element, function() { self.terminator(element); });
    });
  };


  /*  ================================================================  */
  /*  App server functions (main app logic here).             */
  /*  ================================================================  */

  /**
   *  Initialize the server (express) and create the routes and register
   *  the handlers.
   */
  self.initializeServer = function() {
    self.app = express();
    self.app.use(bodyParser.json());
    self.app.use(express.static('./src'));

    //  Add handlers for the app (from the routes).
    for (var r in routes.get) {
      self.app.get(r, routes.get[r]);
    }
    for (var r in routes.post) {
      self.app.post(r, routes.post[r]);
    }
  };


  /**
   *  Initializes the sample application.
   */
  self.initialize = function() {
    self.setupVariables();
    // self.populateCache();
    self.setupMongoose();
    self.setupTerminationHandlers();

    // Create the express server and routes.
    self.initializeServer();
  };


  /**
   *  Start the server (starts up the sample application).
   */
  self.start = function() {
    //  Start the app on the specific interface (and port).
    self.app.listen(self.port, self.ipaddress, function() {
      console.log('%s: Node server started on %s:%d ...',
            Date(Date.now() ), self.ipaddress, self.port);
    });
  };

};   /*  Sample Application.  */

/**
 *  main():  Main code.
 */
var app = new AppServer();
app.initialize();
app.start();

module.exports = app;

