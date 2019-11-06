const fs = require('fs');

export default function (api, options) {

  const { enable = false, timestampFiles } = options;

  // enable为false，则直接退出插件
  if(!enable) return;

  // 如果编译的文件夹不存在，则直接退出程序
  if(!fsExistsSync(api.paths.outputPath)) {
    console.error('没有找到编译后的文件夹，请确认是否已经编译文件！');
    return;
  }

  const file = api.paths.outputPath + '/Version.txt';
  const file1 = api.paths.outputPath + '/Versions.txt';
  let versionStr  = '';

  // 构建前缓存Version.txt的内容
  api.beforeBuildCompileAsync(() => {
    // 读取Version.txt的内容
    if(fsExistsSync(file) || fsExistsSync(file1) || fsExistsSync(api.paths.outputPath + '/version.txt') || fsExistsSync(api.paths.outputPath + '/versions.txt')) {
      if(fsExistsSync(file)) {
        versionStr = fs.readFileSync(file, 'utf-8');
      }

      if(fsExistsSync(file1)) {
        versionStr = fs.readFileSync(file1, 'utf-8');
      }
      
      return true;
    }else{
      console.error('Version.txt文件不存在！');
    }
  });

  // 构建成功后的操作
  api.onBuildSuccess(() => {

    // 写入版本信息
    if(versionStr !== '') {
      fs.writeFileSync(file, versionStr);
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
}
