export function applySettings(settings) {
  const hideOptions = [
    'hideMode',
    'hideHomepageVideos',
    'hideHomepageSidebar',
    'hidePlayerRelated',
    'hidePlayerEndwall',
    'hidePlayerComments',
    'hideShorts',
    'awake',
  ]

  Object.entries(settings)
    .filter(([key]) => hideOptions.includes(key))
    .forEach(([key, value]) => {
      value
        ? document.body.classList.add(key)
        : document.body.classList.remove(key)
    })
}
