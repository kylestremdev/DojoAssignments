$(document).ready(function (){
  $('.ninja').click(function () {
    $(this).hide();
  });

  $('#reset').click(function () {
    $('.ninja').show();
  });
});
