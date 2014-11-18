var robocopyCommand = require('./command'),
    process = require('child_process'),
    Q = require('q');

module.exports = function(options) {

    var command = robocopyCommand(options);

    console.log();
    console.log(command.path + ' ' + command.args.join(' '));
    console.log();

    var robocopy = process.spawn(command.path, command.args, 
        { windowsVerbatimArguments: true });

    var log = function(message, buffer) { 
        message = message.toString('utf8');
        console.log(message); 
        buffer.push(message);
    };

    var stdout = [];
    var stderr = [];

    robocopy.stdout.on('data', function(message) { log(message, stdout); });
    robocopy.stderr.on('data', function(message) { log(message, stderr); });

    var deferred = Q.defer();

    robocopy.on('exit', function(code) { 
        if (code > 8) deferred.reject({ 
            code: code, 
            stdout: stdout.join(''), 
            stderr: stderr.join('') });
        else deferred.resolve(stdout.join(''));
    });    

    return deferred.promise;   

};