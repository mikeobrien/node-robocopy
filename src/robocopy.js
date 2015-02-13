var command = require('./command'),
    process = require('./process'),
    Q = require('q');

function runSerial(commands) {
    commands = commands.map(function(command) { 
        return function() { return process(command); }; 
    });
    var deferred = Q.defer();
    var initial = commands.shift();
    var output = [];
    commands.reduce(function(promise, item) {
        return promise.then(function(stdout) { 
            output.push(stdout);
            return item(); 
        });
    }, initial())
    .done(function(stdout) {
        deferred.resolve(output.concat(stdout));
    });
    return deferred.promise;
}

function runParallel(commands) {
    return Q.all(commands.map(function(command) { 
        return process(command);
    }));
}

module.exports = function(options) {
    return (options.serial ? runSerial : runParallel)(command(options));   
};