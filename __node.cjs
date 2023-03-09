// 使用 fs 递归获取  get-started 下的所有文件夹，作为侧边栏的菜单
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, './get-started');

const getDir = (dir) => {
  const files = fs.readdirSync(dir);
  const dirs = files.filter((file) => {

    if ((!file.startsWith('.') && file.endsWith('.md') && file.match(/^\d/))  || file.toLocaleLowerCase()==='index.md') { 

      return true
    } else {
      return false
    }
  })
  
  // 把 string[] 转为 {title: string,path:string}
  const meta = dirs.map((dir) => { 
    return {
      text: dir.replace(/\.md$/, ''),
      link:'/'+ dir
    }
  })
    
    // console.log(meta)
    
  // return dirs;

  // 查找 meta 里 title=index 的项，如果有，就把它放到第一位
  const index = meta.findIndex((item) => item.text === 'index')
  if (index > -1) {
    const [item] = meta.splice(index, 1)
    meta.unshift(item)
  }


  return meta
}

const r = getDir(targetDir);
console.log(r)