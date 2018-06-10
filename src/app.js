(function(getComputedStyle, requestAnimationFrame) {
  var FADE_INTERVAL = 5000;
  var FADE_STEP = 60 / 3000;

  var blockquotes = document.querySelectorAll('blockquote');
  var count = blockquotes.length;

  function fadeOut(el, cb) {
    el.style.opacity = getComputedStyle(el).getPropertyValue("opacity");

    (function fade() {
      var opacity = +el.style.opacity - FADE_STEP;

      if (opacity >= 0) {
        el.style.opacity = opacity;
        return requestAnimationFrame(fade);
      }

      el.style.display = "none";
      cb();
    })();
  };

  function fadeIn(el, cb) {
    el.style.opacity = getComputedStyle(el).getPropertyValue("opacity");
    el.style.display = "block";

    (function fade() {
      var opacity = +el.style.opacity + FADE_STEP;

      if (opacity <= 1) {
        el.style.opacity = opacity;
        return requestAnimationFrame(fade);
      }

      cb();
    })();
  };

  (function fadeInOut(index) {
    var blockquote = blockquotes[index];

    fadeIn(blockquote, function() {
      setTimeout(
        fadeOut.bind(null, blockquote, fadeInOut.bind(null, (index + 1) % count)),
        FADE_INTERVAL
      );
    });
  })(0);
})(getComputedStyle, requestAnimationFrame);
