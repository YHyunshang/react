export const rem = (new function(doc, win) {
  let docEl = doc.documentElement
  let recalc = function() {
    let clientWidth = docEl.getBoundingClientRect().width
    if (clientWidth < 1180) {
      clientWidth = 1180
    }
    // var clientWidth = docEl.querySelector('.App .header').getBoundingClientRect().width
    if (!clientWidth) return
    docEl.style.fontSize = `${20 * (clientWidth / 320)}px`
    // console.log('1rem is:::', docEl.style.fontSize)
  }
  if (!doc.addEventListener) return
  win.addEventListener('resize', recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}(document, window))
