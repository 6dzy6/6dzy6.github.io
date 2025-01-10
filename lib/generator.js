import { randomInt, createRandomPicker } from './random.js'

export function generate(title, {corpus, min=500, max=1000}) {
  const articleLength = randomInt(min, max) // 文章长度在min和max之间
  const { famous, bosh_before, bosh, conclude, said } = corpus
  const [pickFamous, pickBosh_before, pickBosh, pickConclude, pickSaid] = [famous, bosh_before, bosh, conclude, said].map(createRandomPicker)
 
  // pickFamous() // 随机挑选famous数组中一个值出来

  const article = []
  let totalLength = 0
  while (totalLength < articleLength) {
    let section = '' // 区分段落
    const sectionLength = randomInt(200, 500)
    // 正则用来测试字符串是否满足以这两个字符结尾
    while (section.length < sectionLength || !/[。？]$/.test(section)) {
      const n = randomInt(0, 100)
      if (n < 20) {
        section += sentence(pickFamous, {said: pickSaid, conclude: pickConclude})
      } else if (n < 50) {
        section += sentence(pickBosh_before, {title}) + sentence(pickBosh, {title})
      } else {
        section += sentence(pickBosh, {title})
      }
    }
    totalLength += section.length
    article.push(section)
  }
  return article
}

function sentence(pick, replacer) {
  let result = pick()
  for (const key in replacer) {
    let pre = new RegExp(`{{${key}}}`, 'g')//用正则来查找{{}}这种类型拿来查找进行替换
    let next = typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]
    result = result.replace(pre, next)
  }
  return result
}