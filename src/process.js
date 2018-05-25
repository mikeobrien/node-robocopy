var process = require('child_process'),
    Q = require('q'),
    parser = require('./parser'),
    readline = require('readline');

module.exports = function(command) {

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

    var redirect = function (input, output) {
        readline.createInterface({
            input: input
        }).on('line', function(line) {
            output += log(line);
        });
    }

    redirect(robocopy.stdout, stdout);
    redirect(robocopy.stderr, stderr);

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