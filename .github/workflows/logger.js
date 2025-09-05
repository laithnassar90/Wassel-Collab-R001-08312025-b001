export default function loggerMiddleware ({ getState }) {
  return next => action => {
    console.log('log action', JSON.stringify(action).replace(/[<>"'&]/g, (match) => ({'<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;'}[match])))
    console.log('log state', JSON.stringify(getState()).replace(/[<>"'&]/g, (match) => ({'<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;'}[match])))
    next(action)
  }
}
