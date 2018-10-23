import './stylesheet/main.scss';

['tc-photo', 'portfolio-ccej', 'portfolio-axa', 'portfolio-imawa', 'testimonial-eric'].forEach((id) => {
  document.getElementById(id).src = require(`./image/${id}.png`); // eslint-disable-line
});

// FIXME: without below the forEach seems to be async...
['testimonial-tyler', 'testimonial-nate'].forEach((id2) => {
  document.getElementById(id2).src = require(`./image/${id2}.jpg`); // eslint-disable-line
});

// FIXME: without below the forEach seems to be async...
// const b = 1;
// ["resume"].forEach(id => {
//     document.getElementById(id).href = require(`./resource/${id}.pdf`);
// })

// document.onreadystatechange = () => {
//     if (document.readyState === 'complete') {
//       // document ready

//     }
//   };


// $(function() {
//   var $root = $('html, body');
//   $('a,anchor-link').click(function() {
//     var href = $.attr(this, 'href');
//     $root.animate({
//       scrollTop: $(href).offset().top
//     }, 100, function() {
//       window.location.hash = href;
//     });
//     return false;
//   });
//
//   var topProfile = $("#profile-page").offset().top;
//   var topPortfolio = $("#portfolio-page").offset().top;
//   var topTestimonial = $("#testimonial-page").offset().top;
//
//   $("#main").scroll(function(event) {
//     if ($("#main").scrollTop() >= topProfile + 100) {
//       $("nav a").removeClass("active");
//       $("nav a[href='#profile-page']").addClass("active");
//     }
//     if ($("#main").scrollTop() >= topPortfolio + 100) {
//       $("nav a").removeClass("active");
//       $("nav a[href='#portfolio-page']").addClass("active");
//     }
//     if ($("#main").scrollTop() >= topTestimonial + 100) {
//       $("nav a").removeClass("active");
//       $("nav a[href='#testimonial-page']").addClass("active");
//     }
//   });
// });
