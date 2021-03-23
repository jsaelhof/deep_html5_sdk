var fse = require('fs-extra');

module.exports = {
    run: function () {
        console.log("Concat Libs");

        var destDir = "target";
        fse.mkdirpSync(destDir);

        var destMinFile = destDir + "/deepsdk.min.js";
        var writeMinStream = fse.createWriteStream(destMinFile);

        var destDebugFile = destDir + "/deepsdk.js";
        var writeDebugStream = fse.createWriteStream(destDebugFile);

        // Copy any libs downloaded to the temp/deps
        var depLibDir = "src/lib";
        if (fse.existsSync(depLibDir)) {
            var depLibFiles = fse.walkSync(depLibDir);
            console.log("> " + depLibDir);
            depLibFiles.forEach(function (value) {
                if (value.substring(value.lastIndexOf(".")) == ".js") {
                    console.log("    - " + value);
                    var contents = fse.readFileSync(value, "utf8");
                    writeMinStream.write(contents);
                    writeDebugStream.write(contents);

                    // Add A line break before the next library
                    writeMinStream.write("\n");
                    writeDebugStream.write("\n");
                }
            });
        }

        // Copy the SDK (min.js to the minFile, js to the debugFile)
        console.log("> DeepSDK");
        console.log("    - target/temp/deepsdk.min.js");
        var minContents = fse.readFileSync("target/temp/deepsdk.min.js", "utf8");
        writeMinStream.write(minContents);

        var debugContents = fse.readFileSync("target/temp/deepsdk.js", "utf8");
        writeDebugStream.write(debugContents);



        // Add A line break before the next library
        writeMinStream.write("\n");
        writeDebugStream.write("\n");



        // Copy the EaselJS Extensions (min.js to the minFile, js to the debugFile)
        console.log("> filters-for-easeljs");
        console.log("    - target/temp/kudox/filters-for-easeljs.min.js");
        var minKudoxContents = fse.readFileSync("target/temp/kudox/filters-for-easeljs.min.js", "utf8");
        writeMinStream.write(minKudoxContents);

        var debugKudoxcontents = fse.readFileSync("src/main/js/kudox/filters-for-easeljs.js", "utf8");
        writeDebugStream.write(debugKudoxcontents);



        // Close the streams
        writeMinStream.end();
        writeDebugStream.end();
    }
}