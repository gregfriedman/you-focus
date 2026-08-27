/**
 *
 * @param {Object} map - association of setting name (key) to class name (value)
 * @param {Object} settings - key/value pairs of setting name to setting value
 */
export function syncClassesToSettings(map = {}, settings) {
  Object.entries(settings || {})
    .filter(([key]) => map.hasOwnProperty(key))
    .forEach(([key, value]) => {
      value
        ? document.body.classList.add(map[key])
        : document.body.classList.remove(map[key])
    })
}
