var expect = require('chai').expect,
    cases = require('cases'),
    parse = require('../src/parser');

var stdoutA = "-------------------------------------------------------------------------------\r\n\
   ROBOCOPY     ::     Robust File Copy for Windows\r\n\
\r\n\
-------------------------------------------------------------------------------\r\n\
\r\n\
  Started : Sunday, December 14, 2014 5:28:07 PM\r\n\
\r\n\
   Source = X:\\Temp\\gulptest\\scripts3\\\r\n\
\r\n\
     Dest = X:\\Temp\\gulptest\\scripts2\\\r\n\
\r\n\
\r\n\
    Files :\r\n\
*.*\r\n\
\r\n\
\r\n\
  Options : *.* /DCOPY:DA /COPY:DAT /R:1000000 /W:30\r\n\
\r\n\
\r\n\
------------------------------------------------------------------------------\r\n\
\r\n\
\r\n\
2014/12/14 17:28:07 ERROR 2 (0x00000002) Accessing Source Directory\r\n\
X:\\Temp\\gulptest\\scripts3\\\r\n\
The system cannot find the file specified.";

var stdoutB = "-------------------------------------------------------------------------------\r\n\
   ROBOCOPY     ::     Robust File Copy for Windows\r\n\
\r\n\
-------------------------------------------------------------------------------\r\n\
\r\n\
  Started : Sunday, December 14, 2014 5:21:46 PM\r\n\
   Source = X:\\Temp\\gulptest\\yada\\\r\n\
     Dest -\r\n\
\r\n\
    Files : *.*\r\n\
\r\n\
  Options : *.* /DCOPY:DA /COPY:DAT /R:1000000 /W:30\r\n\
\r\n\
------------------------------------------------------------------------------\r\n\
\r\n\
ERROR : No Destination Directory Specified.\r\n\
\r\n\
       Simple Usage :: ROBOCOPY source destination /MIR\r\n\
\r\n\
             source :: Source Directory (drive:\\path or \\\\server\\share\\path).\r\n\
        destination :: Destination Dir  (drive:\\path or \\\\server\\share\\path).\r\n\
               /MIR :: Mirror a complete directory tree.\r\n\
\r\n\
    For more usage information run ROBOCOPY /?\r\n\
\r\n\
\r\n\
****  /MIR can DELETE files as well as copy them !";

var errorA = "ERROR 2 (0x00000002) Accessing Source Directory\r\n\
X:\\Temp\\gulptest\\scripts3\\\r\n\
The system cannot find the file specified.";

var errorB = "ERROR : No Destination Directory Specified.";

describe('parser', function() {

    it('should return empty value when no errors found', function () {

        expect(parse('')).to.equal(null);

    });

    it('should parse errors', cases([
          [ stdoutA, errorA ],
          [ stdoutB, errorB ]
      ], function (stdout, error) {

        expect(parse(stdout)).to.equal(error);

    }));

});