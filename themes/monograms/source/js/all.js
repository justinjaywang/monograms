+function ($) {
  'use strict';

  // variables
  var body = $('body'),
    postLink = $('#postLink'),
    postThumbnailLink = $('.postThumbnail-link'),
    title = $('.title'),
    invertedColorClass = 'n';

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
  var setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
  };
  var getCookie = function(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return '';
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

  // transition class
  body.addClass('isTransitioning');
  $(window).on('load pageshow', function() {
    setTimeout(function() {
      body.removeClass('isTransitioning');
    }, arriveDelay);
  });

  // get cookie and set colors
  if (getCookie(invertedColorClass) == 'true') {
    body.addClass(invertedColorClass);
  }

  // set cookie on title click and invert colors
  title.click(function(e) {
    setCookie(invertedColorClass, !body.hasClass(invertedColorClass), 365);
    body.toggleClass(invertedColorClass);
  });

}(jQuery);
