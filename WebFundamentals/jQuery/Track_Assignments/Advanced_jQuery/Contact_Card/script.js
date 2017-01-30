$(document).ready(function (){
  $('form').submit(function (){
    var fn = $('input[name="first_name"]').val();
    var ln = $('input[name="last_name"]').val();
    var desc = $('textarea').val();

    $('#contact_group').append("<div class='contact' data="+desc+">" +
                              "<h2>"+fn+" "+ln +"</h2>" +
                              "<p>Click for description</p>" +
                              "</div>");

    return false;
  });

  $(document).on('click', '.contact', function(){
    var temp = $(this).html();
    $(this).html("<p>" + $(this).attr('data') + "</p>");
    $(this).attr('data', temp);
  });
});
