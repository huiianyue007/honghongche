module.exports = {
  checkParams: function (object, checkItems) {
    if (typeof object !== 'object') return false
    let errorIndex = checkItems.findIndex((item) => {
      if (typeof item === 'string' && typeof object[item] === 'undefined') {
        return true
      }
      return false
    })
    return errorIndex === -1
  }
}
