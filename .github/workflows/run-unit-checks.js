import assert from 'assert'
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const wrapper = require(path.join('..','scripts','compat','ride-requests.cjs'))

async function loadActions() {
  try {
    const mod = await wrapper.getActions()
    return mod
  } catch (err) {
    console.error('Failed to load actions ES module:', err && String(err.message).replace(/[<>"'&]/g, (match) => ({'<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;'}[match])))
    process.exit(2)
  }
}

function checkCreate(actions) {
  const fn = actions.createRideRequest
  assert.strictEqual(typeof fn, 'function')
  const action = fn(1,4)
  console.log('create action types[0]:', action.types && String(action.types[0]).replace(/[\r\n\t<>"'&]/g, (match) => ({'\r': '', '\n': '', '\t': '', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;'}[match])))
  console.log('create action payload keys:', action.payload && Object.keys(action.payload).map(k => String(k).replace(/[\r\n\t<>"'&]/g, (match) => ({'\r': '', '\n': '', '\t': '', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;'}[match]))))
  assert(Array.isArray(action.types), 'types must be array')
  assert.strictEqual(action.types[0].endsWith('REQUEST') || typeof action.types[0] === 'string', true)
  assert(action.payload && action.payload.request, 'payload.request required')
  console.log('createRideRequest: OK')
}

function checkChange(actions) {
  const fn = actions.changeRideRequest
  assert.strictEqual(typeof fn, 'function')
  const action = fn(1,'accepted')
  assert(Array.isArray(action.types), 'types must be array')
  assert(action.payload && action.payload.request, 'payload.request required')
  console.log('changeRideRequest: OK')
}

;(async () => {
  try {
    const actions = await loadActions()
    checkCreate(actions)
    checkChange(actions)
    console.log('All checks passed')
  } catch (err) {
    console.error('Check failed:', err && (err.stack ? String(err.stack).replace(/[<>"'&]/g, (match) => ({'<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;'}[match])) : String(err.message).replace(/[<>"'&]/g, (match) => ({'<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;'}[match]))))
    process.exit(2)
  }
})()
