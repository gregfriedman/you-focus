import path from 'node:path'
import fs from 'node:fs'

/**
 * When cleaning up before tests, we want to be very careful that we don't
 *  delete files that we didn't intend to.
 * @param {string} dir - path to the directory which contains the test being run
 *  (e.g. for `src/__tests__/some.test.js` would be `src/__tests__/`)
 * @param {string } subdir - path to delete. Expected to be a child beneath the `dir` parameter
 *  (e.g. `src/__tests__/temp/)
 * @return {Promise<undefined>}
 */
export const safeRemoveSubdir = async (dir, subdir) => {
  const absoluteSubdir = path.resolve(subdir)

  if (!dir) {
    throw new Error('a specific test directory must be specified')
  }
  if (!dir.includes('__tests__')) {
    throw new Error('this is only meant to delete files from a test directory')
  }

  const relativePath = path.relative(dir, absoluteSubdir)

  if (!relativePath) {
    throw new Error('this should not delete the test directory')
  }
  if (relativePath.startsWith('..')) {
    throw new Error('this is only meant to delete subdirectories')
  }

  return fs.promises.rm(absoluteSubdir, {
    recursive: true,
    force: true, // don't throw error if path doesn't exist
  })
}
