export const flattenDeepObjArr = (
  arr,
  deepKey
) => {
  return arr.reduce((previous, current) => {
    previous.push({...current, [deepKey]: undefined})
    if (current[deepKey]?.length) {
      previous.push(...flattenDeepObjArr(current[deepKey], deepKey))
    }
    return previous
  }, [])
}
