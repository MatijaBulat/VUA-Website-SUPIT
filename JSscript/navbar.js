
$(document).on('click', '.navbar-collapse', function(e) {
    if( $(e.target).is('a') ) {
    $(this).collapse('toggle');
    }
});


const lg = 995;

$(window).on('resize', function () {
    if (window.innerWidth > lg) 
    $('.navbar-collapse').collapse('hide')
  })