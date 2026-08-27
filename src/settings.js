import * as R from 'ramda'

export function classChanges(classMap, settings) {
  const lookup = obj => keys => R.props(keys, obj)
  return R.pipe(
    // { a: true, b: false, c: true, d: 17 }
    R.pick(R.keys(classMap)), // { a: true, b: false, c: true }
    R.partition(Boolean), // [ {a: true, c: true}, { b: false} ]
    R.zipObj(['include', 'exclude']), // { include: { a: true, c: true }, exclude: { b: false } }
    R.map(R.keys), // { include: [ 'a', 'c' ], exclude: ['b' }
    R.map(lookup(classMap)) // { include: ['class-a', 'class-c'], exclude: ['class-b'] }
  )(settings)
}

/**
 * Update the classes on the body to add the classes in the classMap for which the
 *  corresponding setting is truthy and remove the classes where the setting is falsy.
 *  Partial settings can be passed to only alter the classes for the specified settings
 *  leaving existing classes in place for previous applied settings.
 * @param {Object} classMap - association of setting name (key) to class name (value)
 * @param {Object} settings - key/value pairs of setting name to setting value
 */
export function syncClassChanges(changes) {
  changes?.include?.forEach(className => document.body.classList.add(className))
  changes?.exclude?.forEach(className =>
    document.body.classList.remove(className)
  )
}
