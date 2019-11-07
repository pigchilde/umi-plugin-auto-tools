import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

const fs = require('fs');

export default function (api, options) {

  let { enable = false, reservedFiles, timestampFiles } = options;
  const defaultReservedFiles = ['Version.txt', 'Versions.txt'];
  let filesDatas = [] // 数据缓存对象

  // enable为false，则直接退出插件
  if(!enable) return;

  // 如果编译的文件夹不存在，则直接退出程序
  if(!fsExistsSync(api.paths.outputPath)) {
    console.error('umi-plugin-auto-tools : 没有找到编译后的文件夹，请确认是否已经编译文件！');
    return;
  }

  // 构建前缓存Version.txt的内容
  api.onStart(() => {

    reservedFiles = reservedFiles ?  reservedFiles : [];

    // 默认确认是'Version.txt'还是'Versions.txt'
    let versionFileName = ''
    for(let i=0; i<defaultReservedFiles.length; i++) {
      if(fsExistsSync(api.paths.outputPath + '/' +defaultReservedFiles[i])) {
        versionFileName =  defaultReservedFiles[i];
        reservedFiles.push(defaultReservedFiles[i]); // 把版本记录文件加入到需要保存的文件列表中
      }
    }

    if(versionFileName === '') {
      console.error('umi-plugin-auto-tools : 版本记录文件不存在！');
    }


    // 判断需要保存的文件是否都存在，如果不存在的，则直接从数组中删除这个文件
    for(let i=0; i<reservedFiles.length; i++) {
      if(!fsExistsSync(api.paths.outputPath + '/' +reservedFiles[i])) {
        console.error('umi-plugin-auto-tools : ' + reservedFiles[i] + '文件不存在！');
        reservedFiles.splice(i,1);
      }
    }

    // 将需要保存的文件缓存到数组中
    for(let i=0; i<reservedFiles.length; i++) {
      const data = fs.readFileSync(api.paths.outputPath + '/' + reservedFiles[i]);
      filesDatas.push(data);
    }

  });

  // 构建成功后的操作
  api.onBuildSuccess(() => {

    // 把缓存的文件写入对应文件夹
    if(filesDatas.length >= 1) {
      for(let i=0; i<filesDatas.length; i++) {
        const dir = reservedFiles[i].replace(/\/[^\/]+$/ig, ''); // 获取文件目录名称
        // 如果是文件夹，则先创建对应文件夹
        if(isPath(dir)) {
          fs.mkdirSync(api.paths.outputPath + '/' + dir, { recursive: true });
        }
        // 写入文件
        fs.writeFileSync(api.paths.outputPath + '/' + reservedFiles[i], filesDatas[i]);
      }
    }
    

    if(timestampFiles !== undefined) {
      // 读取html文件，添加时间戳
      let htmlStr = fs.readFileSync(api.paths.outputPath + '/index.html', 'utf-8');
      const timestamp = new Date().getTime();

      for(let i=0; i< timestampFiles.length; i++){
        htmlStr = htmlStr.replace(timestampFiles[i], timestampFiles[i] + '?v=' + timestamp);
      }

      fs.writeFileSync(api.paths.outputPath + '/index.html', htmlStr);
    }
  })

  // 判断文件是否存在
  function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
  }

  // 判断是路径还是文件
  function isPath(dir) {
    return dir.split('/').length > 1 ? true : false;
  }
}
