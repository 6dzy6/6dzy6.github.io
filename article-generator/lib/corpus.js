// 读取语料库
import { dirname, resolve } from 'path'
import { readFileSync } from 'fs' // 读取文件内容
import { fileURLToPath } from 'url' // 负责把url对象变成path（在node中，url和path是不同的）

// modules语法没有__dirname
if (typeof __dirname === 'undefined') {
  // 给全局挂载个属性__dirname
  globalThis.__dirname = dirname(fileURLToPath(import.meta.url))
}

export function loadCorpus(src) {
  const path = resolve(__dirname, '..', src) // 存储语料库文件的绝对路径
  const data = readFileSync(path, {encoding: 'utf-8'}) // 读取语料库内容
  return JSON.parse(data)// 将语料库内容解析为JSON对象
}