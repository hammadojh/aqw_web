$(document).ready(function() {
  // download icons hover
  alert("hi")
  var oldSrc;
  $(".download-btns a").hover(function() {
    oldSrc = $(this).find("img").attr('src');
    var newSrc = oldSrc.substring(0,oldSrc.indexOf(".svg")) + "-active.svg";
    $(this).find("img").attr('src', newSrc );
  }, function() {
    $(this).find("img").attr('src', oldSrc );
  });
});