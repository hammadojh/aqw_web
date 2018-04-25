$(document).ready(function() {


////////////////// INTRO ///////////////////

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
  autoplay: false,
  loop:false,
  path: 'assets/logo_animation.json' // the path to the animation json
});

// when completed

animation.addEventListener("complete",function(){
  loadMenu();
})


// functions

function loadMenu(){
  $(".container").fadeOut('slow', function() {
    $("#menu").fadeIn('slow', function() {
      $("#menu").css({
        display: 'flex'
      });
    });
  });
  
}

function loadSection(number){
  if( number == 0 ){
    loadWho()
  }else if ( number == 1 ){
    loadNews()
  }else if( number == 2 ){
    loadWork()
  }else if ( number == 3 ){
    loadStart()
  }
}

function loadWho(){

}

function loadNews(){

}

function loadWork(){

}

function loadStart(){

}


////////////////// MENU //////////////////


// colors

var aqwasColors = ['#4ABDB7','#47B8B9','#44B1BA','#3FA9BD','#3B9DBF']

$("#menu div").each(function(index){
  $(this).css("backgroundColor",aqwasColors[index])
})

// icons hover

var oldSrc;
$("#menu-icons img").hover(function() {
  oldSrc = $(this).attr('src');
  var newSrc = oldSrc.substring(0,oldSrc.indexOf(".svg")) + "-hover.svg";
  $(this).attr('src', newSrc );
}, function() {
  $(this).attr('src', oldSrc );
});


// Menu Clicking 

$(".menu-item").click(function(event) {
  if($(this).index()==4)return;
  // hide all others
  var clickedElement = $(this);
  var clickedIndex = $(this).index();
  $(".menu-item").each(function(index, el) {
    if(index != clickedIndex){
      $(this).fadeToggle('fast', function() {
        if(index==4){
          // animate to top
          clickedElement.toggleClass('topFixedItem',200);
          // show arrow
          clickedElement.find('.menu-arrow').fadeToggle();
          // show content
          var contents_ids = ["who","news","projects","start"];
          $("#"+contents_ids[clickedIndex]).fadeToggle('slow',function(){
            sectionLoaded("#"+contents_ids[clickedIndex])
          });
          // fix menu class
          $("#menu").toggleClass('expanded');
          // display flex for some sections
          if(clickedIndex == 0){
            $("#"+contents_ids[clickedIndex]).css('display', 'flex');
          }
        }
      });
    }
  });
});

function sectionLoaded(id){
  if(id === "#who"){
    playAnimation(0) // the first one 
  }else if (id === "#news"){

  }else if (id === "#projects"){

  }else if (id === "#start"){

  }
}

////////////////// WHO ///////////////////


// Hide All
$(".back-img img").first().css("opacity",1)

var imgs = $(".back-img img");

// $(window).scroll(function(){
//   var oneSecHeight = window.screen.height-250;
//   var currentScroll = $(window).scrollTop();
//   var margin = 100
//   // $("#indicator").text(currentScroll);
//   if (currentScroll < margin){
//     $(".back-img img:eq(0)").css("opacity",1)
//     $(".back-img img:eq(1)").css("opacity",0)
//   }else if(currentScroll < oneSecHeight){
//     // $("#indicator").css("backgroundColor","blue");
//     $(".back-img img:eq(0)").css("opacity",0)
//     $(".back-img img:eq(1)").css("opacity",currentScroll/oneSecHeight)
//   }else if(currentScroll < (oneSecHeight)+margin*2){
//     // $("#indicator").css("backgroundColor","cyan");
//     $(".back-img img:eq(0)").css("opacity",0)
//     $(".back-img img:eq(1)").fadeIn("fast")
//     $(".back-img img:eq(2)").css("opacity",0)
//   }else if(currentScroll < oneSecHeight*2){
//     // $("#indicator").css("backgroundColor","green");
//     $(".back-img img:eq(1)").fadeOut('fast')
//     $(".back-img img:eq(2)").css("opacity",(currentScroll-oneSecHeight)/oneSecHeight)
//   }else{
//     $(".back-img img:eq(1)").css("opacity",0)
//     // $("#indicator").css("backgroundColor","orange");
//   }
// });

if ( $(window).width() <= 576) {   
 //Small Screens
 played = [false,false,false]
 $(window).scroll(function(){
  var oneSecWidth = window.screen.width/3;
    //console.log("width"+oneSecWidth)
    var currentHScroll = $(window).scrollLeft()*-1
    //console.log("h-scroll"+currentHScroll)
    if(currentHScroll == 0 && !played[0]){
      console.log("playing - 0")
      played = [true,false,false]
      playAnimation(0)
    }else if (currentHScroll > oneSecWidth*0.5 && currentHScroll < oneSecWidth && !played[1]){
      console.log("playing - 1")
      played = [false,true,false]
      playAnimation(1)
    }else if (currentHScroll > oneSecWidth*1.5 && !played[2]) {
      console.log("playing - 2")
      played = [false,false,true]
      playAnimation(2)
    }else{
    // do nothing
  }
});
} 
else {
  //Large Screens
  played = [false,false,false]
  $(window).scroll(function(){
    var oneSecHeight = window.screen.height/3;
    console.log("height"+oneSecHeight)
    var currentScroll = $(window).scrollTop();
    console.log("scroll"+currentScroll)
    if(currentScroll < oneSecHeight/2 && !played[0]){
      played = [true,false,false]
      playAnimation(0)
    }else if (currentScroll > oneSecHeight*2 && currentScroll < oneSecHeight*3 && !played[1]){
      played = [false,true,false]
      playAnimation(1)
    }else if (currentScroll > oneSecHeight*4 && currentScroll < oneSecHeight*6 && !played[2]) {
      played = [false,false,true]
      playAnimation(2)
    }else{
    // do nothing
  }
});
}

// Smooth scrolling


$('a[href^="#"]').on('click', function(event) {
  var target = $(this.getAttribute('href'));
  scrollTo(target)
});


function scrollTo(target){

  if ( $(window).width() <= 576) {
    if( target.length ) {
      $('html, body').stop().animate({
        scrollLeft: target.offset().left
      }, 1000);
    }

  }else{
    if( target.length ) {
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 75
      }, 1000);
    }
  }

  
}


// $(function() {
//   $.scrollify({
//     section : ".scrollabel"
//   });
// });

////////////////// NEWS ///////////////////

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
        <p>
        `+news_item.details+`
        </p>
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


////////////////// PROJECTS ///////////////////

$.getJSON("projects_data.json", function(json) {
  var projects = null
  $.each(json,function(key,val){
    projects = val;
    $.each(projects,function(index,item){
      // define the html element
      var html = `
      <div id="`+item.abr+`" class="project">
      <div class="bg-imgs">
      <img class="img img-responsive" src="assets/projects/`+item.abr+`_r.png" alt="">
      <img class="img img-responsive" src="assets/projects/`+item.abr+`_l.png" alt="">
      </div>
      <img src="assets/projects/`+item.abr+`_icn.png" alt="" class="project-icon">
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





////////////////// START FORM ///////////////////


// hovering over the services 

function getOldSrc(img,suffex,ext){
  var src = img.attr("src");
  var oldSrc = src.substring(0,src.indexOf(suffex)) + ext
  return oldSrc
}

function getNewSrc(img,suffex,ext){
  var src = img.attr("src");
  var newSrc = src.substring(0,src.indexOf(ext)) + suffex+ext
  return newSrc
}

function unselectAllServices(){
  $(".service").each(function(index, el) {
    if($(el).hasClass('selected')){
      var img = $(el).find("img")
      var elOldSrc = getOldSrc(img,"-active",".svg")
      $(el).find("img").attr('src',elOldSrc);
    }
    $(el).removeClass('selected')
  }); 
}

function uncheck(id){
  element = document.getElementById(id);
  if(element.checked){
    element.click()
  }
}

function unselectAllTypes(){
  $(".type").each(function(index, el) {
    $(el).removeClass('selected')
  }); 
}

function selectService(service){
  if(!service.hasClass('selected')){
    service.addClass('selected')
    service.find("img").attr('src', getNewSrc(service.find("img"),"-active",".svg"));
  }
}

var oldSrc = ""

$(".service").hover(function() {
  if(!$(this).hasClass('selected')){
    var src = $(this).find('img').attr("src");
    oldSrc = src;
    var newSrc = getNewSrc($(this).find('img'),"-active",".svg")
    $(this).find('img').attr("src",newSrc);
  }
}, function() {
  if(!$(this).hasClass('selected')){
    oldSrc = getOldSrc($(this).find("img"),"-active",".svg")
    $(this).find('img').attr("src",oldSrc);
  }
});

// Clicking the services

services = ["web","mobile","cons","ui"]

// form control 

var info = {
  service : "",
  type : "",
  initials : "",
  name : "",
  code : "",
  mobile : "",
  email : "",
  at : ""
}

$(".service").click(function(event) {
  if($(this).hasClass('selected')){
    $(this).removeClass('selected')
    // form
    info.service = ""
  }else{
    unselectAllServices();
    uncheck("other-service-check")
    $(this).addClass('selected')
    // form
    info.service = $(this).attr("id")
  }
});

$(".type").click(function(event) {
  if($(this).hasClass('selected')){
    $(this).removeClass('selected')
    // form
    info.type = ""
  }else{
    unselectAllTypes();
    uncheck("other-type-check") 
    $(this).addClass('selected')
    // form
    info.type = $(this).attr("id")
  }
});


// add arrow to the custom drop down menu

$(".select").append(`
  <span class="arr"><img src="assets/start/SVG/arrow-drop.svg"></span>
  `)


// clicking the services

$(".hovered")

//show other on click

$("input:checkbox.input-check").change(function(event) {

  if ($(this).is(":checked")){
    // show field
    $input_text = $(this).siblings('input:text');
    $input_text.fadeIn(function(event){
      $input_text.focus();
    });
    $(this).siblings('label').hide();
    if($(this).attr('id') == "other-service-check"){
      unselectAllServices()
      // form
      info.service = ""
    }else{
      unselectAllTypes()
      // form
      info.type = ""
    }

  }else{
    $(this).siblings('input:text').hide();
    $(this).siblings('label').fadeIn();
  }
});

// Clicking on the arrow

$('.arr').click(function(){
  $(this).siblings().click()
});


// Form Submitted

$("#send-btn").click(function(){
  // get values
  if(info.service === ""){info.service = $("#other-service").val()}
    if(info.type === ""){info.type = $("#other-type").val()}
      info.initials = $("#mr").val()
    info.name = $("#name").val() 
    info.code = $("#code").val()
    info.number = $("#number").val()
    info.email = $("#email").val()
  // Check form input
  
  data = `mailto:hi@aqwas.sa?subject=New Amazing Partner
  &body=Salam Aqwas, %0D%0A%0D%0AI need a project. Check out the detials:
  %0D%0A%0D%0AService:`+info.service+`
  %0D%0AType:`+info.type+`
  %0D%0AClient Name:`+info.initials+" "+info.name+`
  %0D%0AMobile Number:`+info.code+" "+info.number+`
  %0D%0AEmail:`+info.email+`
  %0D%0A%0D%0ASalam,
  %0D%0A`+info.name+``

  $("#start_form").fadeOut('fast', function() {
    if(info.name){
      $("#submitted_content h2").text(info.initials+" "+info.name)
    }else{
      $("#submitted_content h2").text("إنسان رائع")
    }
    
    $("#submitted_form").fadeIn('slow', function() {
      window.location.href = data;
    });

  });

  
})

function checkFormInputs(){
  if(info.number === "" && info.email === ""){
  }
}

// Form Validation functions

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateMobile(mobile){
  var pattern = /^\d{9}$/;
  return re.test(String(mobile));
}


// ANIMATIONS


// Who

function playAnimation(index){
  console.log(index)
  $(".back-img").children().each(function(currentIndex, el) {
    if(currentIndex != index){
      $(el).css('display', 'none');
    }else{
      $(el).fadeIn()
    }
  });
  // Hide All 
  img = $(".back-img").children().eq(index).find('object');
  img.fadeIn()
  id = img.attr('id');
  vivus = new Vivus(id, {duration: 100,start: 'autostart'}, function(){
    img = $(".back-img").children().eq(index).find('img');
    id = img.attr('id');
    $("#"+id).fadeIn('fast');
  });
}

// Start

$(".service, .type, .btn").mousedown(function(){
  anime({
    targets: $(this)[0],
    scale: 0.95,
    duration: 1000,
    loop: false
  });
}).mouseup(function(event) {
  anime({
    targets: $(this)[0],
    scale: 1,
    duration: 1000,
    loop: false
  });
});

































});