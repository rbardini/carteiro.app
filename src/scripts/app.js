/* =================================
===  WOW ANIMATION             ====
=================================== */
wow = new WOW({mobile: false});
wow.init();


$(function() {
  /* =================================
  ===  STICKY NAV                 ====
  =================================== */
  $('.main-navigation').onePageNav({
    scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
    filter: ':not(.external)',
    changeHash: false
  });

  var $navbar = $('.sticky-navigation');
  var $navbarToggle = $('.navbar-toggle');

  // Collapse navigation on mobile after clicking on link
  if (matchMedia('(max-width: 480px)').matches) {
    $('.main-navigation a').on('click', function() {
      $navbarToggle.click();
    });
  }

  // Navigation visible on scroll
  $(window).scroll($.debounce(200, function() {
    var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    $navbar.stop().animate({top: top > 40 ? 0 : -$navbar.height()});
  }));


  /* =================================
  ===  OWL CROUSEL               ====
  =================================== */
  $('#feedbacks').owlCarousel({
    navigation: false, // Show next and prev buttons
    slideSpeed: 800,
    paginationSpeed: 400,
    autoPlay: 5000,
    singleItem: true
  });

  $('#screenshots').owlCarousel({
    items: 4, //10 items above 1000px browser width
    itemsDesktop: [1000, 4], //5 items between 1000px and 901px
    itemsDesktopSmall: [900, 2], // betweem 900px and 601px
    itemsTablet: [600, 1], //2 items between 600 and 0
    itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
  });


  /* =================================
  ===  Nivo Lightbox              ====
  =================================== */
  $('#screenshots a').nivoLightbox({effect: 'fadeScale'});
});


/* =================================
===  Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 FIX
=================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'))
  document.querySelector('head').appendChild(msViewportStyle)
}
