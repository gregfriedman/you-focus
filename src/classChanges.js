import * as R from 'ramda'

/** Return the values for all the specified keys in the specified object */
const lookup = obj => keys => R.props(keys, obj)

/**
 * Return the list of classes that should be included and those that should be excluded
 *  based on the current settings. Truthy settings are included.
 * @param {Object} classMap - association of setting name (key) to class name (value)
 * @param {Object} settings - key/value pairs of setting name to setting value
 * @return { {include: string[], exclude: string[] } }
 */
export function classChanges(classMap, settings) {
  return R.pipe(
    // { a: true, b: false, c: true, d: 17 }
    R.pick(R.keys(classMap)), // { a: true, b: false, c: true }
    R.partition(Boolean), // [ {a: true, c: true}, { b: false} ]
    R.zipObj(['include', 'exclude']), // { include: { a: true, c: true }, exclude: { b: false } }
    R.map(R.keys), // { include: [ 'a', 'c' ], exclude: ['b' ] }
    R.map(lookup(classMap)) // { include: ['class-a', 'class-c'], exclude: ['class-b'] }
  )(settings)
}

/**
 * Update the classes on the body to add the included classes and remove the excluded classes
 * @param { {include: string[], exclude: string[]} } changes
 */
export function syncClassChanges(changes) {
  changes?.include?.forEach(className => document.body.classList.add(className))
  changes?.exclude?.forEach(className =>
    document.body.classList.remove(className)
  )
}
