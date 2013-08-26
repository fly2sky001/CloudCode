// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
var util = require('util');
var logMessage;

AV.Cloud.define("hello", function(request, response) {
    response.success("Hello Dong!~");
});

AV.Cloud.beforeSave("CodeGeneration", function(request, response) {

    var BatchNo = request.object.get("BatchNo");
    var header = request.object.get("header");
    var dataRow = request.object.get("dataRow");

    header=header.replace(/(\r\n|\n|\r)/gm,"");
    var tableKeys= header.split("\t");
    //Seven element so far, so index from 0-6
    //Useage: tableKeys[0-6];

    //split DataTable into Data rows by new line  \\n
    var dataRows = dataRow.split("\n");

    //loop Through each row
    for (var i=0;i<dataRows.length;i++)
    {
        //split each value row into cells by tab \\t
        //Useage: cellsValue[0-6];
        var cellsValue= dataRows[i].split("\t");
        console.log("cellsValue \t:"+cellsValue);

        //format referred to backbone.js & AVOS.JS
        var ProductCode = AV.Object.extend("ProductCode");
        var pc = new ProductCode();

        //Setup value & key
        pc.set(tableKeys[0],cellsValue[0] );
        pc.set(tableKeys[1],cellsValue[1] );
        pc.set(tableKeys[2],cellsValue[2] );
        pc.set(tableKeys[3],cellsValue[3] );
        pc.set(tableKeys[4],cellsValue[4] );
        pc.set(tableKeys[5],cellsValue[5] );
        pc.set(tableKeys[6],cellsValue[6] );

        // save row in server.
        pc.save(null, {
            success: function(pc) {
                // Execute any logic that should take place after the object is saved.
                console.log ( 'Last object created with objectId: ' + pc.id+ 'with total count:'+i);
            },
            error: function(pc, error) {
                // Execute any logic that should take place if the save fails.
                // error is a AV.Error with an error code and description.
                console.log('Failed to create new object, with error code: '
                    + util.inspect(error)+"\n"+ util.inspect(pc)+"\n @"+i);
            }
        });
    }
    response.success();
});
