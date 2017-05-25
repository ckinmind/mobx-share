#!/usr/bin/env node
const fs = require('fs-extra')
const yargs = require('yargs')
const _ = require('lodash')
const Metalsmith = require('metalsmith')
const collections = require('metalsmith-collections')
const minimatch = require('minimatch')
const path = require('path')

yargs
  .usage('$0 [args]')
  .option('page', {
    alias: 'p',
    desc: 'Page name',
    demand: false,
    type: 'string'
  })
  // .option('force', {
  //   alias: 'f',
  //   desc: 'Force to overwrite existed page dir',
  //   demand: false,
  //   type: 'boolean'
  // })
  .option('remove', {
    alias: 'r',
    desc: 'Remove page files',
    demand: false,
    type: 'boolean'
  })
  .option('index', {
    alias: 'i',
    desc: 'Update index.html',
    demand: false,
    type: 'boolean'
  })
  .help()

const argv = yargs.argv
// console.log(JSON.stringify(argv, null, 4))

if (argv.index) {
  updateIndexHtml()
  process.exit(0)
}

// 验证page参数
if (!argv.page) {
  console.log('Invalid value: <p|page>')
  process.exit(0)
}

const componentName = argv.page

const metadata = {
  ComponentName: _.upperFirst(_.camelCase(componentName)),
  componentName: _.camelCase(componentName),
  'component-name': _.kebabCase(componentName)
}

// 执行：删除页面文件
if (argv.remove) {
  removePage()
  // 执行：更新首页链接列表
  updateIndexHtml()
}

// 执行：创建页面文件
else {
  createPage()
  // 执行：更新首页链接列表
  updateIndexHtml()
}



// ========================== 以下的函数集合 ==========================

// 删除页面文件
function removePage () {
  // 删除配置文件
  fs.removeSync(`./page-config/${metadata['component-name']}.js`)
  // 删除页面文件
  fs.removeSync(`./src/page-${metadata['component-name']}`)
}

// 创建页面级初始化文件
function createPage () {

  // 替换变量
  function insertVariables(content) {
    content = content.replace(/<%ComponentName%>/g, metadata.ComponentName)
    content = content.replace(/<%componentName%>/g, metadata.componentName)
    content = content.replace(/<%component-name%>/g, metadata['component-name'])
    return content
  }

  // 创建对应的`page-config`文件
  const content = fs.readFileSync('./_template/page-config.js', 'utf8')
  fs.writeFileSync(`./page-config/${metadata['component-name']}.js`, insertVariables(content), 'utf8')

  Metalsmith(__dirname)
    .metadata(metadata)
    .source(`./_template/page-dir`)
    .destination(`./src/page-${metadata['component-name']}`)
    .clean(true) // 是否先清除目录，不写这一行时默认为true
    .use(collections({
      files: '*/*'
    }))
    .use(renameFileAndInsertVariables({
      filesToRename: {
        pattern: '*.*',
        rename: function (name) {
          return createFileName(name, metadata)
        }
      }
    }, metadata))
    .build(function (error) {
      if (error) {
        console.log('error: ' + error)
      } else {
        console.log(`success: page-${metadata['component-name']} was created.`)
      }
    })
}

// 创建文件名
function createFileName(name, metadata) {
  return name.replace(/<%component-name%>/g, metadata['component-name'])
}

// 文件重命名 + 文件内容替换
function renameFileAndInsertVariables(options, metadata) {
  return function(files, metalsmith, done) {

    Object.keys(options).forEach(function(opt) {
      var matcher = minimatch.Minimatch(options[opt].pattern);

      Object.keys(files).forEach(function(file) {


        if (!matcher.match(file)) {
          return;
        }

        var rename = options[opt].rename;
        var renamedEntry = path.dirname(file) + '/';

        if (typeof rename === 'function') {
          renamedEntry += rename(path.basename(file));
        } else {
          renamedEntry += rename;
        }

        // 加入新的文件 files[renamedEntry] 是 node 的 file 对象
        files[renamedEntry] = files[file];

        var fileContent = fs.readFileSync(`./_template/page-dir/${file}`, 'utf8');

        fileContent = fileContent.replace(/<%ComponentName%>/g, metadata.ComponentName);
        fileContent = fileContent.replace(/<%componentName%>/g, metadata.componentName);
        fileContent = fileContent.replace(/<%component-name%>/g, metadata['component-name']);

        files[renamedEntry].contents = fileContent;

        delete files[file];
      });
    });
    done();
  };
}


function updateIndexHtml() {
  let content = fs.readFileSync('./index.html', 'utf8')

  const listStart = '<!--list start-->'
  const listEnd = '<!--list end-->'

  const pageConfigPath = path.join(__dirname, 'page-config')

  // 已经创建的页面名称
  let pageNames = fs.readdirSync(pageConfigPath).map(function (item) {
    if (!fs.statSync(pageConfigPath + '/' + item).isFile()) {
      console.error(`Page config must be a file: "${pageConfigPath + '/' + item}" is not a file!`)
      process.exit(0)
    }
    return item.split('.')[0]
  })

  // 过滤掉空的文件名
  // 出现原因：系统自动生成.开头的隐藏文件
  pageNames = _.filter(pageNames, function(pageName) {
    return !!pageName
  })

  let newContent = pageNames.map(function(pageName) {
    return `<div><a href="./${pageName}.html">${pageName}</a></div>`
  })

  newContent.unshift(listStart)
  newContent.push(listEnd)

  content = content.replace(/<\!\-\-list\sstart\-\->[\s\S]*<\!\-\-list\send\-\->/, newContent.join('\n'))

  fs.writeFileSync('./index.html', content, 'utf8')
}
