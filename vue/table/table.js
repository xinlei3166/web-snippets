/**
 * 动态设置表格高度
 * @param el 表格dom元素
 * @param dis 差值，例如页面底部的分页组件高度
 */
export function dynamicTableHeight(el, dis) {
  let top = el.offsetTop
  let par = el.offsetParent
  while (par !== null) {
    top += par.offsetTop
    par = par.offsetParent
  }
  return window.innerHeight - top - dis
}
