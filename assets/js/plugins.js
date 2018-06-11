$(document).ready(function(){
  // Stop
stopAnimation();
function stopAnimation(){
  $("#animation").css('display', 'none');
  loadMenu();
}
  // Animation
  var animation = bodymovin.loadAnimation({
    container: document.getElementById("bm"),
    renderer: 'svg',
    autoplay: true,
    loop:false,
    path: 'assets/logo_animation.json' // the path to the animation json
  });
// When completed
  animation.addEventListener("complete",function(){
    loadMenu();
  })
// Load menu
  function loadMenu(){
    $("#animation.container").fadeOut('slow', function() {
      $("#menu").fadeIn('slow', function() {
        $("#menu").css({
          display: 'block'
        });
      });
    });
  }
// Colors
  var aqwasColors = ['#4ABDB7','#47B8B9','#44B1BA','#3FA9BD','#3B9DBF']
  $(".card-header").each(function(index){
    $(this).css("backgroundColor",aqwasColors[index])
  })
// Card clicking
  jQuery.fx.off = true;
  $(".card-header").click(function () {
    if($(this).closest('.card').index()==4)return;
    var clickedElement = $(this);
    var clickedIndex = $(this).closest('.card').index();

    $(".card-header").each(function(index, el) {
      if(index != clickedIndex){
        $(this).toggle(function( ) {
          if(index==4){
            $('.main-footer').toggleClass('footer-display');
            $('body').toggleClass('body-overflow');
            clickedElement.toggleClass('fixed-header');
            clickedElement.find('.arrow-up').fadeToggle();
            clickedElement.siblings('.card-body').toggle();
          }
        });
      }
    });
  });
// Form
  var $form = $('#projects-form'),
      url = 'https://script.google.com/macros/s/AKfycbwmoJ0G4lWevHVPdKP3Oi3ut_P-x9_PvF1xBJXO5-nbqMTbDvs/exec'

  $('#submit-form').on('click', function(e) {
    e.preventDefault();
    $(':input[required]:visible').each(function() {
      if ($(this).val() == '') {
        $('small.form-text').text('هذا الحقل مطلوب');
      }
    });
    var fullName = $('#full-name').val();
    var jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: $form.serializeArray()
    }).success(
        $('#submitted-content').addClass('flex-display'),
        $('#user-info').html(fullName)
    );
  })
// Other inputs
$(".switch").on("change", function(event) {
     if($(this).is(":checked")) {
       $(this).parent().next().children('label').fadeOut();
        $(this).parent().next().children('input').fadeIn();
        $(this).parent().parent().prev().children().children('.disabled-box').css('pointer-events', 'none');
        $(this).parent().parent().prev().children().children('.disabled-box').removeClass('selected');
        $(this).parent().parent().prev().children('.empty-input').val(' ');
     } else {
       $(this).parent().next().children('label').fadeIn();
       $(this).parent().next().children('input').fadeOut();
       $(this).parent().parent().prev().children().children('.disabled-box').css('pointer-events', 'auto');
     }
   });
 // Smooth scrolling
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();

         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });

// SVG
 $('.next, .new-caption-area').on('click', function(e) {
   e.preventDefault()
   $('.carousel').carousel('next')
 });
 $('.prev').on('click', function(e) {
   e.preventDefault()
   $('.carousel').carousel('prev')
 });

 jQuery(function ($) {
     $('.carousel').carousel();
     var caption = $('div.carousel-item:nth-child(1) .carousel-caption');
     console.log(caption);
     $('.new-caption-area').html(caption.html());
     caption.css('display', 'none');

     $(".carousel").on('slide.bs.carousel', function (evt) {
         var caption = $('div.carousel-item:nth-child(' + ($(evt.relatedTarget).index() + 1) + ') .carousel-caption');
         $('.new-caption-area').html(caption.html());
         caption.css('display', 'none');
     });
 });

});
// Project type id
  function assignProjectType (el) {
     $('#project-type').val(el.id);
     // $('.project-type').removeClass('selected');
     $(el).addClass('selected');
  }
// Project field id
  function assignProjectField (el) {
     $('#project-field').val(el.id);
     $('.project-field').removeClass('selected');
     $(el).addClass('selected');
  }
// News
$.getJSON("news_data.json", function(json) {
  var years = null;
  $.each(json,function(key,val){
    years = val.years;
    $.each(years,function(index,year_item){
      var year_html = `
      <h1 class="year">
      `+year_item.year+`
      </h1>
      `
      $.each(year_item.news,function(index,news_item){
        var news_html = `
        <div class="news-row">
        <div class="month">
        <p>`+news_item.month+`<br> `+year_item.year+`</p>
        </div>
        <div class="bullet">
        </div>
        <div class="news-section">
        <h3 class="title">
        `+news_item.title+`
        </h3>
        <p class='lead'>
        `+news_item.details+`
        </p>
        `+news_item.image+`
        </div>
        </div>
        `
        // append news_html it to year_html
        year_html = year_html + news_html;

      }); // repeat for each news item

      // append the year to #news
      $("#news").append(year_html);

    }); // repeat for each year item
  });
});
// Projects
$.getJSON("projects_data.json", function(json) {
  var projects = null
  $.each(json,function(key,val){
    projects = val;
    $.each(projects,function(index,item){
      // define the html element
      var html = `
      <div id="`+item.abr+`" class="project">
      <div class="bg-imgs">
      <img class="img img-responsive wow fadeInUp" src="assets/images/projects/`+item.abr+`_r.png" alt="">
      <img class="img img-responsive wow fadeInUp" src="assets/images/projects/`+item.abr+`_l.png" alt="">
      </div>
      <img src="assets/images/projects/`+item.abr+`_icn.png" alt="" class="project-icon wow fadeInUp">
      <div class="project-name">
      <p class="app">`+item.type+`</p>
      <h2 class="name">`+item.name+`</h2>
      </div>
      <p class="project-description">
      `+item.description+`
      </p>
      <!--<button class="project-btn">
      <a href="project.html" >عرض المزيد</a>
      </button>
      -->
      </div>
      <!-- Separator -->
      <div class="separator"></div>
      `
      // append the object
      $("#projects").append(html);
      // change the colors
      $("#"+item.abr+" .project-btn").css({
        "border": '1px solid #'+item.color,
        "color": '#'+item.color
      });
      $("#"+item.abr+" .project-name").css({
        "color": '#'+item.color
      });
      $("#"+item.abr+" .project-btn").hover(function() {
        $(this).css({
          "color": "white" ,
          "backgroundColor": '#'+item.color,
          "border":"none"
        });
      }, function() {
        /* Stuff to do when the mouse leaves the element */
        $(this).css({
          "color": '#'+item.color ,
          "backgroundColor": white,
          "border":'#'+item.color
        });
      });

    }) // for each array item ( project )
  })
});
