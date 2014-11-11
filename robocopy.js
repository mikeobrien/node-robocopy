var robocopyCommand = require('command'),
    process = require('child_process');

module.exports = function(options, cb) {

    var command = robocopyCommand(options);

    console.log();
    console.log(command.path + ' ' + command.args.join(' '));
    console.log();

    var robocopy = process.spawn(command.path, command.args, { windowsVerbatimArguments: true });

    var log = function(message) { console.log(message.toString('utf8')); };

    robocopy.stdout.on('data', log);
    robocopy.stderr.on('data', log);

    robocopy.on('exit', function(code) { 
        if (code > 8) cb(code);
        else cb();
    });    

};