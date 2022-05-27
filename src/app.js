;(function (getComputedStyle, requestAnimationFrame) {
  const FADE_INTERVAL = 5000
  const FADE_STEP = 60 / 3000

  const blockquotes = document.querySelectorAll('blockquote')
  const count = blockquotes.length

  function fadeOut (el, cb) {
    el.style.opacity = getComputedStyle(el).getPropertyValue('opacity')
    ;(function fade () {
      const opacity = +el.style.opacity - FADE_STEP

      if (opacity >= 0) {
        el.style.opacity = opacity
        return requestAnimationFrame(fade)
      }

      el.style.display = 'none'
      cb()
    })()
  }

  function fadeIn (el, cb) {
    el.style.opacity = getComputedStyle(el).getPropertyValue('opacity')
    el.style.display = 'block'
    ;(function fade () {
      const opacity = +el.style.opacity + FADE_STEP

      if (opacity <= 1) {
        el.style.opacity = opacity
        return requestAnimationFrame(fade)
      }

      cb()
    })()
  }

  ;(function fadeInOut (index) {
    const blockquote = blockquotes[index]

    fadeIn(blockquote, function () {
      setTimeout(
        fadeOut.bind(
          null,
          blockquote,
          fadeInOut.bind(null, (index + 1) % count)
        ),
        FADE_INTERVAL
      )
    })
  })(0)
})(window.getComputedStyle, window.requestAnimationFrame)
