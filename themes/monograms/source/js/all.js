+function ($) {
  'use strict';

  // variables
  var body = $('body'),
    postLink = $('#postLink'),
    postThumbnailLink = $('.postThumbnail-link');

  var arriveDelay = 0,
    departDelay = 0;

  // functions
  var navigate = function(href) {
    body.addClass('isTransitioning');
    setTimeout(function() {
      window.location.href = href;
    }, departDelay);
  };
  var navigateBack = function() {
    body.addClass('isTransitioning');
    setTimeout(function() {
      history.back();
    }, departDelay);
  };

  // postThumbnail
  postThumbnailLink.click(function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    if (href) navigate(href);
    return false;
  });

  // post
  postLink.click(function(e) {
    e.preventDefault();
    var shouldGoBack = (history.length > 1) && (document.referrer.indexOf(window.location.origin) != -1);
    if (shouldGoBack) {
      navigateBack();
    } else {
      var href = $(this).attr('href');
      if (href) navigate(href);
    }
    return false;
  });

  // image preloading and transition classes
  body.addClass('isTransitioning');
  $(window).on('load pageshow', function() {
    setTimeout(function() {
      body.removeClass('isTransitioning');
    }, arriveDelay);
  });

}(jQuery);
