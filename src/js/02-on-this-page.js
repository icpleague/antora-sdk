;(function () {
  'use strict'

  var sidebar = document.querySelector('aside.toc.sidebar')
  if (!sidebar) return
  var doc
  var headings
  if (
    document.querySelector('.body.-toc') ||
    !(headings = find('h1[id].sect0, .sect1 > h2[id]', (doc = document.querySelector('article.doc')))).length
  ) {
    sidebar.parentNode.removeChild(sidebar)
    return
  }
  var lastActiveFragment
  var links = {}
  var menu

  var list = headings.reduce(function (accum, heading) {
    var link = toArray(heading.childNodes).reduce(function (target, child) {
      if (child.nodeName !== 'A') target.appendChild(child.cloneNode(true))
      return target
    }, document.createElement('a'))
    links[(link.href = '#' + heading.id)] = link
    var listItem = document.createElement('li')
    listItem.appendChild(link)
    accum.appendChild(listItem)
    return accum
  }, document.createElement('ul'))

  if (!(menu = sidebar && sidebar.querySelector('.toc-menu'))) {
    menu = document.createElement('div')
    menu.className = 'toc-menu'
  }

  var title = document.createElement('h3')
  title.textContent = 'Topics on this page'
  menu.appendChild(title)
  menu.appendChild(list)

  if (sidebar) {
    window.addEventListener('load', function () {
      onScroll()
      window.addEventListener('scroll', onScroll)
    })
  }

  var startOfContent = doc.querySelector('h1.page ~ :not(.labels)')
  if (startOfContent) {
    var embeddedToc = document.createElement('aside')
    embeddedToc.className = 'toc embedded'
    embeddedToc.appendChild(menu.cloneNode(true))
    doc.insertBefore(embeddedToc, startOfContent)
  }

  function onScroll () {
    //var targetPosition = doc.parentNode.offsetTop
    // var targetPosition = 0
    var targetPosition = doc.parentNode.offsetTop
    var activeFragment
    headings.some(function (heading) {
      if (Math.floor(heading.getBoundingClientRect().top) <= targetPosition) {
        activeFragment = '#' + heading.id
      } else {
        return true
      }
    })
    if (activeFragment) {
      if (activeFragment !== lastActiveFragment) {
        if (lastActiveFragment) {
          links[lastActiveFragment].classList.remove('is-active')
        }
        var activeLink = links[activeFragment]
        activeLink.classList.add('is-active')
        if (menu.scrollHeight > menu.offsetHeight) {
          menu.scrollTop = Math.max(0, activeLink.offsetTop + activeLink.offsetHeight - menu.offsetHeight)
        }
        lastActiveFragment = activeFragment
      }
    } else if (lastActiveFragment) {
      links[lastActiveFragment].classList.remove('is-active')
      lastActiveFragment = undefined
    }
  }

  function find (selector, from) {
    return toArray((from || document).querySelectorAll(selector))
  }

  function toArray (collection) {
    return [].slice.call(collection)
  }
})()