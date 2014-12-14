var expect = require('expect.js'),
    command = require('../src/command.js');

describe('command', function(){

    it('should build all options', function() {

        var options = {
            source: 'c:/source/path',
            destination: 'c:/destination/path',
            files: ['*.html', '*.js', '/bin/*.*'],
            copy: {
                subdirs: true,
                emptySubdirs: true,
                levels: 1,
                restartMode: true,
                backupMode: true,
                restartThenBackupMode: true,
                efsRawMode: true,
                info: 'DAT',
                dirTimestamps: true,
                securityInfo: true,
                allInfo: true,
                noInfo: true,
                fixSecurity: true,
                fixTimes: true,
                purge: true,
                mirror: true,
                moveFiles: true,
                moveFilesAndDirs: true,
                addAttributes: 'RASH',
                removeAttributes: 'CNET',
                createDirsAndEmptyFiles: true,
                fatFilenames: true,
                disableLongPaths: true,
                monitorCountTrigger: 2,
                monitorTimeTrigger: 3,
                multiThreaded: 4,
                runTimes: { 
                    start: '10:30', 
                    end: '11:30',
                    checkPerFile: true 
                },
                interPacketGap: 5,
                symbolicLink: true
            },
            file: {
                copyArchived: true,
                copyArchivedAndReset: true,
                includeAttributes: 'RASHC',
                excludeAttributes: 'NETO',
                excludeFiles: ['~*.*', '*.tmp'],
                excludeDirs: ['tmp', 'obj'],
                excludeChangedFiles: true,
                excludeNewerFiles: true,
                excludeOlderFiles: true,
                excludeExtraFilesAndDirs: true,
                excludeLonelyFilesAndDirs: true,
                includeSameFiles: true,
                includeTweakedFiles: true,
                maximumSize: 6,
                minimumSize: 7,
                maximumAge: 8,
                minimumAge: 9,
                maximumLastAccess: 10,
                minimumLastAccess: 11,
                fatFileTimes: true,
                compensateForDst: true,
                excludeJunctions: true,
                excludeDirectoryJunctions: true,
                excludeFileJunctions: true
            },
            retry: {
                count: 12,
                wait: 13,
                saveAsDefault: true,
                waitForShareNames: true
            },
            logging: {
                listOnly: true,
                includeExtraFiles: true,
                verbose: true,
                includeSourceTimestamps: true,
                includeFullPaths: true,
                sizesAsBytes: true,
                excludeFileSizes: true,
                excludeFileClasses: true,
                excludeFilenames: true,
                excludeDirectoryNames: true,
                hideProgress: true,
                showEta: true,
                output: { 
                    file: 'copy.log', 
                    overwrite: true,
                    unicode: true
                },
                showUnicode: true,
                showAndLog: true,
                noJobHeader: true,
                noJobSummary: true

            },
            job: {
                deriveParameters: 'Derive Job Name',
                saveParameters: 'Save Job Name',
                quiteAfterProcessing: true,
                noSourceDir: true,
                noDestinationDir: true,
                includesFiles: true
            }
        };

        var result = command(options);

        expect(result.path).to.be('robocopy');

        var args = result.args;

        expect(args[0]).to.be('"c:\\source\\path"');
        expect(args[1]).to.be('"c:\\destination\\path"');
        expect(args[2]).to.be('"*.html"');
        expect(args[3]).to.be('"*.js"');
        expect(args[4]).to.be('"\\bin\\*.*"');
        expect(args[5]).to.be('/s');
        expect(args[6]).to.be('/e');
        expect(args[7]).to.be('/lev:1');
        expect(args[8]).to.be('/z');
        expect(args[9]).to.be('/b');
        expect(args[10]).to.be('/zb');
        expect(args[11]).to.be('/efsraw');
        expect(args[12]).to.be('/copy:DAT');
        expect(args[13]).to.be('/dcopy:T');
        expect(args[14]).to.be('/sec');
        expect(args[15]).to.be('/copyall');
        expect(args[16]).to.be('/nocopy');
        expect(args[17]).to.be('/secfix');
        expect(args[18]).to.be('/timfix');
        expect(args[19]).to.be('/purge');
        expect(args[20]).to.be('/mir');
        expect(args[21]).to.be('/mov');
        expect(args[22]).to.be('/move');
        expect(args[23]).to.be('/a+:RASH');
        expect(args[24]).to.be('/a-:CNET');
        expect(args[25]).to.be('/create');
        expect(args[26]).to.be('/fat');
        expect(args[27]).to.be('/256');
        expect(args[28]).to.be('/mon:2');
        expect(args[29]).to.be('/mot:3');
        expect(args[30]).to.be('/MT:4');
        expect(args[31]).to.be('/rh:1030-1130');
        expect(args[32]).to.be('/pf');
        expect(args[33]).to.be('/ipg:5');
        expect(args[34]).to.be('/sl');
        expect(args[35]).to.be('/a');
        expect(args[36]).to.be('/m');
        expect(args[37]).to.be('/ia:RASHC');
        expect(args[38]).to.be('/xa:NETO');
        expect(args[39]).to.be('/xf');
        expect(args[40]).to.be('"~*.*"');
        expect(args[41]).to.be('"*.tmp"');
        expect(args[42]).to.be('/xd');
        expect(args[43]).to.be('"c:\\source\\path\\tmp"');
        expect(args[44]).to.be('"c:\\source\\path\\obj"');
        expect(args[45]).to.be('"c:\\destination\\path\\tmp"');
        expect(args[46]).to.be('"c:\\destination\\path\\obj"');
        expect(args[47]).to.be('/xct');
        expect(args[48]).to.be('/xn');
        expect(args[49]).to.be('/xo');
        expect(args[50]).to.be('/xx');
        expect(args[51]).to.be('/xl');
        expect(args[52]).to.be('/is');
        expect(args[53]).to.be('/it');
        expect(args[54]).to.be('/max:6');
        expect(args[55]).to.be('/min:7');
        expect(args[56]).to.be('/maxage:8');
        expect(args[57]).to.be('/minage:9');
        expect(args[58]).to.be('/maxlad:10');
        expect(args[59]).to.be('/minlad:11');
        expect(args[60]).to.be('/fft');
        expect(args[61]).to.be('/dst');
        expect(args[62]).to.be('/xj');
        expect(args[63]).to.be('/xjd');
        expect(args[64]).to.be('/xjf');
        expect(args[65]).to.be('/r:12');
        expect(args[66]).to.be('/w:13');
        expect(args[67]).to.be('/reg');
        expect(args[68]).to.be('/tbd');
        expect(args[69]).to.be('/l');
        expect(args[70]).to.be('/x');
        expect(args[71]).to.be('/v');
        expect(args[72]).to.be('/ts');
        expect(args[73]).to.be('/fp');
        expect(args[74]).to.be('/bytes');
        expect(args[75]).to.be('/ns');
        expect(args[76]).to.be('/nc');
        expect(args[77]).to.be('/nfl');
        expect(args[78]).to.be('/ndl');
        expect(args[79]).to.be('/np');
        expect(args[80]).to.be('/eta');
        expect(args[81]).to.be('/unilog:"copy.log"');
        expect(args[82]).to.be('/unicode');
        expect(args[83]).to.be('/tee');
        expect(args[84]).to.be('/njh');
        expect(args[85]).to.be('/njs');
        expect(args[86]).to.be('/job:"Derive Job Name"');
        expect(args[87]).to.be('/save:"Save Job Name"');
        expect(args[88]).to.be('/quit');
        expect(args[89]).to.be('/nosd');
        expect(args[90]).to.be('/nodd');
        expect(args[91]).to.be('/if');

    });

    it('should not set thread count if a bool', function() {

        var options = {
            source: '',
            destination: '',
            files: [],
            copy: {
                multiThreaded: true
            }
        };

        var args = command(options).args;

        expect(args[2]).to.be('/MT');

    });
    
    it('should set non unicode output log', function() {

        var options = {
            source: '',
            destination: '',
            files: [],
            logging: {
                output: { 
                    file: 'copy.log', 
                    overwrite: true
                }
            }
        };

        var args = command(options).args;

        expect(args[2]).to.be('/log:"copy.log"');

    });
    
    it('should set appending output log', function() {

        var options = {
            source: '',
            destination: '',
            files: [],
            logging: {
                output: { 
                    file: 'copy.log'
                }
            }
        };

        var args = command(options).args;

        expect(args[2]).to.be('/log+:"copy.log"');

    });

    it('should convert relative paths to absolute', function() {

        var options = {
            source: 'c:/source/path/',
            destination: 'c:/destination/path/',
            files: [],
            file: {
                excludeDirs: ['tmp/', 'obj/', '../yada', 'c:\\yada', '\\\\someserver\\yada'],
            }
        };

        var result = command(options);

        expect(result.path).to.be('robocopy');

        var args = result.args;

        expect(args.length).to.be(11);

        expect(args[0]).to.be('"c:\\source\\path"');
        expect(args[1]).to.be('"c:\\destination\\path"');
        expect(args[2]).to.be('/xd');
        expect(args[3]).to.be('"c:\\source\\path\\tmp"');
        expect(args[4]).to.be('"c:\\source\\path\\obj"');
        expect(args[5]).to.be('"c:\\source\\yada"');
        expect(args[6]).to.be('"c:\\yada"');
        expect(args[7]).to.be('"\\\\someserver\\yada"');
        expect(args[8]).to.be('"c:\\destination\\path\\tmp"');
        expect(args[9]).to.be('"c:\\destination\\path\\obj"');
        expect(args[10]).to.be('"c:\\destination\\yada"');

    });

});
