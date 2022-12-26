// 正弦（sine），数学术语，在直角三角形中，任意一锐角∠A的对边与斜边的比叫做∠A的正弦，记作sinA，即sinA=∠A的对边/斜边(sinA=a/c)。
// sin返回数的正弦
const angle = 60  // 假设角度为60度
const radian = angle * Math.PI / 180  // 计算出弧度
const sin = Math.sin(radian)
console.log(sin) // 输出sin 60度的值

const a = 10  // 对边
let c // 斜边
c = a / sin
console.log(c)  // 输出斜边c的值

const r = 350
const _a = 350
const b = 350
const count = 34
const m = (2 * Math.PI) / count  // 计算出弧度
const x = _a+r*Math.sin(m*3)
const y =b+r*Math.cos(m*3)
console.log('x: ', x)
console.log('y: ', y)
