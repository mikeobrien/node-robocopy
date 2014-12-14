var robocopyCommand = require('./command'),
    process = require('child_process'),
    Q = require('q'),
    parser = require('./parser');

module.exports = function(options) {

    var command = robocopyCommand(options);

    console.log();
    console.log(command.path + ' ' + command.args.join(' '));
    console.log();

    var robocopy = process.spawn(command.path, command.args, 
        { windowsVerbatimArguments: true });

    var log = function(message) { 
        message = message.toString('utf8');
        console.log(message); 
        return message;
    };

    var stdout = '';
    var stderr = '';

    robocopy.stdout.on('data', function(message) { stdout += log(message); });
    robocopy.stderr.on('data', function(message) { stderr += log(message); });

    var deferred = Q.defer();

    robocopy.on('exit', function(code) { 
        if (code > 8) 
        {
            var errors = parser(stdout);
            var message = 'Robocopy failed (' + code + ')' + 
                (errors || stderr ? ': \r\n' + (errors || stderr) : '.');
            deferred.reject(new Error(message));
        }
        else deferred.resolve(stdout);
    });    

    return deferred.promise;   

};