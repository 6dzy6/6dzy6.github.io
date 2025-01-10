// 生成文章的函数
import { generate } from './lib/generator.js'
// 加载语料库
import { loadCorpus } from './lib/corpus.js'
import { writeFileSync } from 'fs'
import { createRandomPicker } from './lib/random.js'
// 读取语料库数据
const corpus = loadCorpus('./corpus/data.json')

function fn() {
  const title = createRandomPicker(corpus.title)()
  const res = generate(title, {corpus, min: 1000, max: 2000})// 从哪个语料库拿东西，最小生成和最大生成多少字
  writeFileSync(`./output/${title}.txt`, res.join('\n'))//在文件夹下写入这个文件
  // console.log(res);
}

export default fn




