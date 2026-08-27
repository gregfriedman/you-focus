/**
 * Update the classes on the body to add the classes in the classMap for which the
 *  corresponding setting is truthy and remove the classes where the setting is falsy.
 *  Partial settings can be passed to only alter the classes for the specified settings
 *  leaving existing classes in place for previous applied settings.
 * @param {Object} classMap - association of setting name (key) to class name (value)
 * @param {Object} settings - key/value pairs of setting name to setting value
 */
export function syncClassesToSettings(classMap, settings) {
  Object.entries(settings || {})
    .filter(([key]) => classMap?.hasOwnProperty(key))
    .forEach(([key, value]) => {
      value
        ? document.body.classList.add(classMap[key])
        : document.body.classList.remove(classMap[key])
    })
}
