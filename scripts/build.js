var tsc = require("./tsc.js");
var uglify = require("./uglify.js");
var license = require("./license.js");
var concat = require("./concat.js");
var fse = require("fs-extra");
var parseString = require('xml2js').parseString;

// Get the Version from the POM
var xml = fse.readFileSync('./pom.xml',"utf8");
var version = undefined;
parseString(xml, (err, result) => {
    version = result.project.version[0];
});

// Clean
fse.removeSync("target");
fse.mkdirpSync("target");

// Compile TypeScript
tsc.run();

// Uglify
uglify.run("deepsdk","target/temp","target/temp/deepsdk.js");
uglify.run("filters-for-easeljs","target/temp/kudox","src/main/js/kudox/filters-for-easeljs.js");

// License
license.run("target/temp/deepsdk.min.js");
license.run("target/temp/deepsdk.js");
license.run("target/temp/deepsdk.min.js","// deepsdk.min.js v"+version+"\n");
license.run("target/temp/deepsdk.js","// deepsdk.js v"+version+"\n");
license.run("target/temp/deepsdk.d.ts","// deepsdk.d.ts v"+version+"\n\n");

// Copy Definitions
fse.copySync("target/temp/deepsdk.d.ts","target/deepsdk.d.ts");

// Concat our default libs with the SDK and EaselJS extensions
concat.run();