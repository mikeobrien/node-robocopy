var path = require('path'),
    _ = require('lodash');

_.mixin(require('underscore.string').exports());

function qualify(path) {
    var quote = function(p) { return '"' + p + '"'; };
    if (path instanceof Array) return path.map(quote);
    else return quote(path);
}

function toWindowsPath(path) {
    var clean = function(p) {
        p = p.replace(/\//g, '\\').trim();
        if (p.substr(-1) === '\\') p = p.substr(0, p.length - 1);
        return p;
    };
    if (Array.isArray(path)) return path.map(clean);
    else return clean(path);
}

function toAbsolutePath(relativePath, base) {
    var toAbsolute = function(p) {
        return _.startsWith(p, '\\\\') || _.include(p, ':') ? p : 
            (base ? path.join(base, p) : path.resolve(p));
    };
    if (Array.isArray(relativePath)) return relativePath.map(toAbsolute);
    else return toAbsolute(relativePath);
}

function buildCommand(options) {
    var args = [];

    var source = toAbsolutePath(options.source);
    var destination = toAbsolutePath(options.destination);

    args.push(qualify(toWindowsPath(source)));
    args.push(qualify(toWindowsPath(destination)));
    if (options.files) 
        args = args.concat(qualify(toWindowsPath(options.files)));

    if (options.copy) {
        var copy = options.copy;
        if (copy.subdirs) args.push('/s');
        if (copy.emptySubdirs) args.push('/e');
        if (copy.levels) args.push('/lev:' + copy.levels);
        if (copy.restartMode) args.push('/z');
        if (copy.backupMode) args.push('/b');
        if (copy.restartThenBackupMode) args.push('/zb');
        if (copy.efsRawMode) args.push('/efsraw');
        if (copy.info) args.push('/copy:' + copy.info);
        if (copy.dirTimestamps) args.push('/dcopy:T');
        if (copy.securityInfo) args.push('/sec');
        if (copy.allInfo) args.push('/copyall');
        if (copy.noInfo) args.push('/nocopy');
        if (copy.fixSecurity) args.push('/secfix');
        if (copy.fixTimes) args.push('/timfix');
        if (copy.purge) args.push('/purge');
        if (copy.mirror) args.push('/mir');
        if (copy.moveFiles) args.push('/mov');
        if (copy.moveFilesAndDirs) args.push('/move');
        if (copy.addAttributes) args.push('/a+:' + copy.addAttributes);
        if (copy.removeAttributes) args.push('/a-:' + copy.removeAttributes);
        if (copy.createDirsAndEmptyFiles) args.push('/create');
        if (copy.fatFilenames) args.push('/fat');
        if (copy.disableLongPaths) args.push('/256');
        if (copy.monitorCountTrigger) args.push('/mon:' + copy.monitorCountTrigger);
        if (copy.monitorTimeTrigger) args.push('/mot:' + copy.monitorTimeTrigger);
        if (copy.multiThreaded) args.push('/MT' + (copy.multiThreaded !== true && 
            copy.multiThreaded > 0 ? ':' + copy.multiThreaded : ''));
        
        if (copy.runTimes) { 
            args.push('/rh:' + copy.runTimes.start.replace(/\:/g, '') + '-' + copy.runTimes.end.replace(/\:/g, ''));
            if (copy.runTimes.checkPerFile) args.push('/pf');
        }

        if (copy.interPacketGap) args.push('/ipg:' + copy.interPacketGap);
        if (copy.symbolicLink) args.push('/sl');
    }

    if (options.file) {
        var file = options.file;
        if (file.copyArchived) args.push('/a');
        if (file.copyArchivedAndReset) args.push('/m');
        if (file.includeAttributes) args.push('/ia:' + file.includeAttributes);
        if (file.excludeAttributes) args.push('/xa:' + file.excludeAttributes);

        if (file.excludeFiles && file.excludeFiles.length > 0) {
            args.push('/xf');
            args = args.concat(qualify(toWindowsPath(file.excludeFiles)));
        }

        if (file.excludeDirs && file.excludeDirs.length > 0) {
            args.push('/xd');
            var excludeDirs;
    	    if (file.excludeDirsRelative) {
                excludeDirs = qualify(toWindowsPath(file.excludeDirs));
    	    } else {
                excludeDirs = _.chain(toAbsolutePath(file.excludeDirs, source)
                    .concat(toAbsolutePath(file.excludeDirs, destination)))
                    .uniq()
                    .map(toWindowsPath)
                    .map(qualify)
                    .value();
            }  
            args = args.concat(excludeDirs);
        }

        if (file.excludeChangedFiles) args.push('/xct');
        if (file.excludeNewerFiles) args.push('/xn');
        if (file.excludeOlderFiles) args.push('/xo');
        if (file.excludeExtraFilesAndDirs) args.push('/xx');
        if (file.excludeLonelyFilesAndDirs) args.push('/xl');
        if (file.includeSameFiles) args.push('/is');
        if (file.includeTweakedFiles) args.push('/it');
        if (file.maximumSize) args.push('/max:' + file.maximumSize);
        if (file.minimumSize) args.push('/min:' + file.minimumSize);
        if (file.maximumAge) args.push('/maxage:' + file.maximumAge);
        if (file.minimumAge) args.push('/minage:' + file.minimumAge);
        if (file.maximumLastAccess) args.push('/maxlad:' + file.maximumLastAccess);
        if (file.minimumLastAccess) args.push('/minlad:' + file.minimumLastAccess);
        if (file.fatFileTimes) args.push('/fft');
        if (file.compensateForDst) args.push('/dst');
        if (file.excludeJunctions) args.push('/xj');
        if (file.excludeDirectoryJunctions) args.push('/xjd');
        if (file.excludeFileJunctions) args.push('/xjf');
    }

    if (options.retry) {
        var retry = options.retry;
        if (retry.count) args.push('/r:' + retry.count);
        if (retry.wait) args.push('/w:' + retry.wait);
        if (retry.saveAsDefault) args.push('/reg');
        if (retry.waitForShareNames) args.push('/tbd');
    }

    if (options.logging) {
        var logging = options.logging;
        if (logging.listOnly) args.push('/l');
        if (logging.includeExtraFiles) args.push('/x');
        if (logging.verbose) args.push('/v');
        if (logging.includeSourceTimestamps) args.push('/ts');
        if (logging.includeFullPaths) args.push('/fp');
        if (logging.sizesAsBytes) args.push('/bytes');
        if (logging.excludeFileSizes) args.push('/ns');
        if (logging.excludeFileClasses) args.push('/nc');
        if (logging.excludeFilenames) args.push('/nfl');
        if (logging.excludeDirectoryNames) args.push('/ndl');
        if (logging.hideProgress) args.push('/np');
        if (logging.showEta) args.push('/eta');
        if (logging.output) args.push('/' + (logging.output.unicode ? 'uni' : '') + 'log' + 
            (logging.output.overwrite ? '' : '+') + ':' + qualify(toWindowsPath(logging.output.file)));
        if (logging.showUnicode) args.push('/unicode');
        if (logging.showAndLog) args.push('/tee');
        if (logging.noJobHeader) args.push('/njh');
        if (logging.noJobSummary) args.push('/njs');

    }

    if (options.job) {
        var job = options.job;
        if (job.deriveParameters) args.push('/job:' + qualify(job.deriveParameters));
        if (job.saveParameters) args.push('/save:' + qualify(job.saveParameters));
        if (job.quiteAfterProcessing) args.push('/quit');
        if (job.noSourceDir) args.push('/nosd');
        if (job.noDestinationDir) args.push('/nodd');
        if (job.includesFiles) args.push('/if');
    }

    return {
        path: 'robocopy',
        args: args
    };
}

module.exports = function(options) {
    return _.chain(_.isArray(options.destination) ? 
        options.destination : [ options.destination ])
        .map(function(destination) {
            return buildCommand(_.defaults({ destination: destination }, options));
        }).value();
};
