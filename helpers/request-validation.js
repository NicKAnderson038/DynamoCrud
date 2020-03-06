const emptyStringCheck = data =>
  !!Object.values(data)
    .filter(d => typeof d === 'string')
    .filter(d => d.length === 0).length

const isObjEmpty = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

module.exports = {
  emptyStringCheck,
  isObjEmpty,
}
