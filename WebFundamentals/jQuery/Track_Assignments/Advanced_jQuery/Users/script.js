$(document).ready(function () {
  $('form').submit(function () {
    var ele = $('tbody').append("<tr><//tr>");
    var formObject = {};
    var formInfo = $(this).serialize();
    formInfo = formInfo.split("&");

    var formattedformInfo = formInfo.map(function (item) {
      return item.split("=");
    });

    formattedformInfo.map(function (item){
      formObject[item[0]] = item[1].replace(/%20/g, " ").replace(/%23/g, "#");
    });

    for (var key in formObject) {
      if (formObject.hasOwnProperty(key)) {
        ele.append("<td>" + formObject[key] + "<//td>")
      }
    }

    console.log(formObject);
    return false;
  });
});
