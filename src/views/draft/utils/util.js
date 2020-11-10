function setJson(vm, JSON) {
  JSON.list = JSON.list.map(item => {
    if (item.on && item.on !== null) {
      for (let key of item.on) {
        item.on[key].bind(vm)
      }
    }
    return item
  })
  return JSON
}
