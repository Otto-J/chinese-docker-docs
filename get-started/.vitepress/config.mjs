import { defineConfig } from "vitepress";
import { generateSidebar } from 'vitepress-sidebar';



const site =   generateSidebar({
      root: './get-started',
       collapseDepth: 2
    })

    // console.log(site)


export default defineConfig({
  ignoreDeadLinks: true,
  lang: 'zh-CN',
  title: 'Docker 民间中文文档',
  outDir: '../dist',
  base:'/chinese-docker-docs',
  themeConfig:{
    sidebar: site
      // [
    //   { text: 'index', link: '/index.md' },
    //   { text: '02_our_app', link: '/02_our_app.md' },
    //   { text: '03_updating_app', link: '/03_updating_app.md' },
    //   { text: '04_sharing_app', link: '/04_sharing_app.md' },
    //   { text: '05_persisting_data', link: '/05_persisting_data.md' },
    //   { text: '06_bind_mounts', link: '/06_bind_mounts.md' },
    //   { text: '07_multi_container', link: '/07_multi_container.md' },
    //   { text: '08_using_compose', link: '/08_using_compose.md' },
    //   { text: '09_image_best', link: '/09_image_best.md' },
    //   { text: '11_what_next', link: '/11_what_next.md' }
    // ]
  }

})