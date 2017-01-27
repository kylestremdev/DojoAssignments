$(document).ready(function (){
  $('.hide-show').hover(function(){
    $('.hide-show-me').show();
  }, function (){
    $('.hide-show-me').hide();
  });

  $(".toggle").click(function(){
    $(".toggle-me").toggle();
  });

  $('.slide-down-up').hover(function(){
    $('.slide-down-up-me').slideDown();
  }, function(){
    $('.slide-down-up-me').slideUp();
  });

  $('.slide-toggle').click(function(){
    $('.slide-toggle-me').slideToggle();
  });

  $('.fade-in-out').hover(function(){
    $('.fade-in-out-me').fadeIn();
  }, function(){
    $('.fade-in-out-me').fadeOut();
  });

  $('.add-remove-class').hover(function (){
    $('.add-remove-class-me').addClass('red');
  }, function() {
    $('.add-remove-class-me').removeClass('red');
  });

  $('.after').click(function(){
    $('.after-me').after("<p>text</p>");
  });

  $('.before').click(function(){
    $('.before-me').before("<p>text</p>");
  });

  $('.append').click(function(){
    $('.append-me').append(" text");
  });

  $('.html').click(function(){
    $('.html-me').html("<p class='html-me'>Changed</p>");
  });

  $('.attr').click(function(){
    var txt = $('.attr-me').attr("class");
    $('.attr-me').text(txt);
  });

  $('.val').click(function () {
    var txt = $('#val-select').val();
    $('.val-me').text(txt);
  });

  $('.data').click(function (){
    $('.data-me').data('data', Math.random());
    $('.data-me').text($('.data-me').data('data'));
  });
});
