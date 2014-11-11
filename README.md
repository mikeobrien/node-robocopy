# robocopy

[![npm version](http://img.shields.io/npm/v/robocopy.svg)](https://npmjs.org/package/robocopy) [![build status](http://img.shields.io/travis/mikeobrien/node-robocopy.png.svg)](https://travis-ci.org/mikeobrien/node-robocopy.png)

Node wrapper for [Robocopy](http://technet.microsoft.com/en-us/library/cc733145.aspx).

## Install

```bash
$ npm install robocopy --save
```

## Usage

The options below mirror those of the robocopy command itself, so check 
out the [robocopy documentation](http://technet.microsoft.com/en-us/library/cc733145.aspx) 
for more details. The first parameter is the options followed by a callback 

```js
var robocopy = require('robocopy');

robocopy({ ... }, function(error) { ... });

robocopy({

    // Specifies the path to the source directory.
    source: '',

    // Specifies the path to the destination directory.
    destination: '',

    // Specifies the file or files to be copied. You can use wildcard characters (* or ?), if
    // you want. If the File parameter is not specified, *.* is used as the default value.
    files: ['*.html', '*.js', '/bin/*.*'],

    // Copy options

    copy: {

        // Copies subdirectories. Note that this option excludes empty directories. [/s]
        subdirs: true|false,

        // Copies subdirectories. Note that this option includes empty directories. [/e]
        emptySubdirs: true|false,

        // Copies only the top N levels of the source directory tree. [/lev:<N>]
        levels: 0,

        // Copies files in Restart mode. [/z]
        restartMode: true|false,

        // Copies files in Backup mode. [/b]
        backupMode: true|false,

        // Uses Restart mode. If access is denied, this option uses Backup mode. [/zb]
        restartThenBackupMode: true|false,

        // Copies all encrypted files in EFS RAW mode. [/efsraw]
        efsRawMode: true|false,

        // Specifies the file properties to be copied. [/copy:<CopyFlags>]
        // The following are the valid values for this option:
        //   D Data
        //   A Attributes
        //   T Time stamps
        //   S NTFS access control list (ACL)
        //   O Owner information
        //   U Auditing information
        // The default value for CopyFlags is DAT (data, attributes, and time stamps).
        info: 'DAT',

        // Copies directory time stamps. [/dcopy:T]
        dirTimestamps: true|false,

        // Copies files with security (equivalent to copy.flags: 'DAT'). [/sec]
        securityInfo: true|false,

        // Copies all file information (equivalent to copy.flags: 'DATSOU'). [/copyall]
        allInfo: true|false,

        // Copies no file information (useful with copy.purge). [/nocopy]
        noInfo: true|false,

        // Fixes file security on all files, even skipped ones. [/secfix]
        // When using this option, specify the type of security information
        // you want to copy by also using one of these additional copy options:
        // copy.allInfo, copy.info: 'O|S|U' or copy.securityInfo.
        fixSecurity: true|false,

        // Fixes file times on all files, even skipped ones. [/timfix]
        fixTimes: true|false,

        // Deletes destination files and directories that no longer exist in the source. [/purge]
        purge: true|false,

        // Mirrors a directory tree (equivalent to copy.emptySubdirs plus copy.purge). [/mir]
        mirror: true|false,

        // Moves files, and deletes them from the source after they are copied. [/mov]
        moveFiles: true|false,

        // Moves files and directories, and deletes them from the source after they
        // are copied. [/move]
        moveFilesAndDirs: true|false,

        // Adds the specified attributes to copied files. [/a+:[RASHCNET]]
        addAttributes: 'RASHCNET',

        // Removes the specified attributes from copied files. [/a-:[RASHCNET]]
        removeAttributes: 'RASHCNET',

        // Creates a directory tree and zero-length files only. [/create]
        createDirsAndEmptyFiles: true|false,

        // Creates destination files by using 8.3 character-length FAT file names only. [/fat]
        fatFilenames: true|false,

        // Turns off support for very long paths (longer than 256 characters). [/256]
        disableLongPaths: true|false,

        // Monitors the source, and runs again when more than N changes are detected. [/mon:<N>]
        monitorCountTrigger: 0,

        // Monitors source, and runs again in M minutes if changes are detected. [/mot:<M>]
        monitorTimeTrigger: 0,

        // Creates multi-threaded copies with N threads. N must be an integer between
        // 1 and 128 or a boolean. [/MT[:N]]
        // - The default value for N is 8.
        // - This parameter cannot be used with the copy.interPacketGap and
        //   copy.efsRawMode parameters.
        // - Redirect output using log.enabled option for better performance.
        // - This flag applies to Windows Server 2008 R2 and Windows 7.
        multiThreaded: true|10,

        // Specifies run times when new copies may be started. [/rh:hhmm-hhmm]
        runTimes: {
            start: '10:30',
            end: '11:30',
            // Checks run times on a per-file (not per-pass) basis. [/pf]
            checkPerFile: true|false
        },

        // Specifies the inter-packet gap to free bandwidth on slow lines. [/ipg:n]
        interPacketGap: 0,

        // Copies the symbolic link instead of the target. [/sl]
        symbolicLink: true|false

    },

    // File options

    file: {

        // Copies only files for which the Archive attribute is set. [/a]
        copyArchived: true|false,

        // Copies only files for which the Archive attribute is set, and resets the
        // Archive attribute. [/m]
        copyArchivedAndReset: true|false,

        // Includes only files for which any of the specified attributes are set.
        // [/ia:[RASHCNETO]]
        includeAttributes: 'RASHCNETO',

        // Excludes files for which any of the specified attributes are set. [/xa:[RASHCNETO]]
        excludeAttributes: 'RASHCNETO',

        // Excludes files that match the specified names or paths. Note that FileName
        // can include wildcard characters (* and ?). [/xf <FileName>[ ...]]
        excludeFiles: ['~*.*', '*.tmp'],

        // Excludes directories that match the specified names and paths.
        // [/xd <Directory>[ ...]]
        excludeDirs: ['tmp', 'obj'],

        // Excludes changed files. [/xct]
        excludeChangedFiles: true|false,

        // Excludes newer files. [/xn]
        excludeNewerFiles: true|false,

        // Excludes older files. [/xo]
        excludeOlderFiles: true|false,

        // Excludes extra files and directories. [/xx]
        excludeExtraFilesAndDirs: true|false,

        // Excludes "lonely" files and directories. [/xl]
        excludeLonelyFilesAndDirs: true|false,

        // Includes the same files. [/is]
        includeSameFiles: true|false,

        // Includes "tweaked" files. [/it]
        includeTweakedFiles: true|false,

        // Specifies the maximum file size (to exclude files bigger than N bytes). [/max:<N>]
        maximumSize: 10,

        // Specifies the minimum file size (to exclude files smaller than N bytes). [/min:<N>]
        minimumSize: 10,

        // The following four options can either be an integer or date. If N is less than 1900,
        // N specifies the number of days. Otherwise, N specifies a date in the format YYYYMMDD.

        // Specifies the maximum file age (exclude files older than N days or date) [/maxage:<N>]
        maximumAge: 10|'20131115',

        // Specifies the minimum file age (exclude files newer than N days or date) [/minage:<N>]
        minimumAge: 10|'20131115',

        // Specifies the maximum last access date (excludes files unused since N) [/maxlad:<N>]
        maximumLastAccess: 10|'20131115',

        // Specifies the minimum last access date (excludes files used since N) [/minlad:<N>]
        minimumLastAccess: 10|'20131115',

        // Assumes FAT file times (two-second precision). [/fft]
        fatFileTimes: true|false,

        // Compensates for one-hour DST time differences. [/dst]
        compensateForDst: true|false,

        // Excludes junction points, which are normally included by default. [/xj]
        excludeJunctions: true|false,

        // Excludes junction points for directories. [/xjd]
        excludeDirectoryJunctions: true|false,

        // Excludes junction points for files. [/xjf]
        excludeFileJunctions: true|false

    },

    // Retry options

    retry: {

        // Specifies the number of retries on failed copies. The default value of N is
        // 1,000,000 (one million retries). [/r:<N>]
        count: 10,

        // Specifies the wait time between retries, in seconds. The default value of N
        // is 30 (wait time 30 seconds). [/w:<N>]
        wait: 30,

        // Saves the values specified in the retry.count and retry.wait options as
        // default settings in the registry. [/reg]
        saveAsDefault: true|false,

        // Specifies that the system will wait for share names to be defined
        // (retry error 67). [/tbd]
        waitForShareNames: true|false

    },

    // Logging options

    logging: {

        // Specifies that files are to be listed only (and not copied, deleted, or
        // time stamped). [/l]
        listOnly: true|false,

        // Reports all extra files, not just those that are selected. [/x]
        includeExtraFiles: true|false,

        // Produces verbose output, and shows all skipped files. [/v]
        verbose: true|false,

        // Includes source file time stamps in the output. [/ts]
        includeSourceTimestamps: true|false,

        // Includes the full path names of the files in the output. [/fp]
        includeFullPaths: true|false,

        // Prints sizes, as bytes. [/bytes]
        sizesAsBytes: true|false,

        // Specifies that file sizes are not to be logged. [/ns]
        excludeFileSizes: true|false,

        // Specifies that file classes are not to be logged. [/nc]
        excludeFileClasses: true|false,

        // Specifies that file names are not to be logged. [/nfl]
        excludeFilenames: true|false,

        // Specifies that directory names are not to be logged. [/ndl]
        excludeDirectoryNames: true|false,

        // Specifies that the progress of the copying operation (the number of
        // files or directories copied so far) will not be displayed. [/np]
        hideProgress: true|false,

        // Shows the estimated time of arrival (ETA) of the copied files. [/eta]
        showEta: true|false,

        // Writes the status output to the log file.
        // [/log+:<LogFile>, /log:<LogFile>, /unilog:<LogFile>, /unilog+:<LogFile>]
        output: {
            file: 'copy.log',
            overwrite: true|false,
            unicode: true|false
        },

        // Displays the status output as Unicode text. [/unicode]
        showUnicode: true|false,

        // Writes the status output to the console window, as well as to the log file. [/tee]
        showAndLog: true|false,

        // Specifies that there is no job header. [/njh]
        noJobHeader: true|false,

        // Specifies that there is no job summary. [/njs]
        noJobSummary: true|false

    },

    // Job options

    job: {

        // Specifies that parameters are to be derived from the named job file. [/job:<JobName>]
        deriveParameters: 'JobName',

        // Specifies that parameters are to be saved to the named job file. [/save:<JobName>]
        saveParameters: 'JobName',

        // Quits after processing command line (to view parameters). [/quit]
        quiteAfterProcessing: true|false,

        // Indicates that no source directory is specified. [/nosd]
        noSourceDir: true|false,

        // Indicates that no destination directory is specified. [/nodd]
        noDestinationDir: true|false,

        // Includes the specified files. [/if]
        includesFiles: true|false

    }
}, cb);
```

## License
MIT License
