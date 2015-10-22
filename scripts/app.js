$(function() {
  $('.header__wrapper').stickyNavbar()
  $('#glide').glide();
  $('#home').on('click', function(e){
    e.preventDefault()
  })
});