function doGet(e){
  
  var op = e.parameter.action;

  var ss=SpreadsheetApp.openByUrl("giver_google_sheet_url");
  var sheet = ss.getSheetByName("Sheet1");

  
  if(op=="insert")
    return insert_value(e,sheet);
  
  //Make sure you are sending proper parameters 
  if(op=="read")
    return read_value(e,ss);
  
  if(op=="update")
    return update_value(e,sheet);
  
  if(op=="delete")
    return delete_value(e,sheet);
  
}

//Recieve parameter and pass it to function to handle


function insert_value(request,sheet){
var id = request.parameter.id;
var address1 = request.parameter.address1;
var address2 = request.parameter.address2;
var address3 = request.parameter.address3;

var postalCode = request.parameter.postalCode;
var country = request.parameter.country;
var company = request.parameter.company;
var contact = request.parameter.contact;

var contact_person = request.parameter.contact_person;
var department = request.parameter.department;
var email = request.parameter.email;
var phone = request.parameter.phone;

var product = request.parameter.product;
var entry_by = request.parameter.entry_by;


var rowData = sheet.appendRow([id,company,contact,entry_by,department,phone,contact_person,product,address1,address2,address3,postalCode,country,email]); 
    var result="Insertion successful";
     result = JSON.stringify({
        "result": result
    });  
    
  return ContentService
  .createTextOutput(request.parameter.callback + "(" + result + ")")
  .setMimeType(ContentService.MimeType.JAVASCRIPT);  
  }
  
  



function read_value(request,ss){
  
 
  var output  = ContentService.createTextOutput(),
      data    = {};
  //Note : here sheet is sheet name , don't get confuse with other operation 
      var sheet="sheet1";

  data.records = readData_(ss, sheet);
  
  var callback = request.parameters.callback;
  
  if (callback === undefined) {
    output.setContent(JSON.stringify(data));
  } else {
    output.setContent(callback + "(" + JSON.stringify(data) + ")");
  }
  output.setMimeType(ContentService.MimeType.JAVASCRIPT);
  
  return output;
}


function readData_(ss, sheetname, properties) {

  if (typeof properties == "undefined") {
    properties = getHeaderRow_(ss, sheetname);
    properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
  }
  
  var rows = getDataRows_(ss, sheetname),
      data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r],
        record  = {};

    for (var p in properties) {
      record[properties[p]] = row[p];
    }
    
    data.push(record);

  }
  return data;
}



function getDataRows_(ss, sheetname) {
  var sh = ss.getSheetByName(sheetname);

  return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
}


function getHeaderRow_(ss, sheetname) {
  var sh = ss.getSheetByName(sheetname);

  return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];  
} 
  

//update function

function update_value(request,sheet){
    var output  = ContentService.createTextOutput();
    var id = request.parameter.id;
    var flag=0;
    var lr= sheet.getLastRow();

    //variables
    var company = request.parameter.company;
    var contact = request.parameter.contact;
    var entry_by = request.parameter.entry_by;
    var department = request.parameter.department;

    var phone = request.parameter.phone;
    var contact_person = request.parameter.contact_person;
    var product = request.parameter.product;

    var address1 = request.parameter.address1;
    var address2 = request.parameter.address2;
    var address3 = request.parameter.address3;

    var postalCode = request.parameter.postalCode;
    var country = request.parameter.country;
    var email = request.parameter.email;
    for(var i=1;i<=lr;i++)
    {
        var rid = sheet.getRange(i, 1).getValue();
        if(rid==id)
        {
            sheet.getRange(i,2).setValue(company);
            sheet.getRange(i,3).setValue(contact);
            sheet.getRange(i,4).setValue(entry_by);
            sheet.getRange(i,5).setValue(department);

            sheet.getRange(i,6).setValue(phone);
            sheet.getRange(i,7).setValue(contact_person);
            sheet.getRange(i,8).setValue(product);

            sheet.getRange(i,9).setValue(address1);
            sheet.getRange(i,10).setValue(address2);
            sheet.getRange(i,11).setValue(address3);

            sheet.getRange(i,12).setValue(postalCode);
            sheet.getRange(i,13).setValue(country);
            sheet.getRange(i,14).setValue(email);

            var result="value updated successfully";
            flag=1;
        }
    }
    if(flag==0)
        var result="id not found";
    
    result = JSON.stringify({
        "result": result
    });  
    
    return ContentService
    .createTextOutput(request.parameter.callback + "(" + result + ")")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);   
}


  

function delete_value(request,sheet){
  
  var output  = ContentService.createTextOutput();
   var id = request.parameter.id;
  var flag=0;

  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
    var rid = sheet.getRange(i, 1).getValue();
    if(rid==id){
      sheet.deleteRow(i);
      var result="value deleted successfully";
      flag=1;
    }
    
  }
  if(flag==0)
    var result="id not found";

   result = JSON.stringify({
    "result": result
  });  
  return ContentService
  .createTextOutput(request.parameter.callback + "(" + result + ")")
  .setMimeType(ContentService.MimeType.JAVASCRIPT);   

}