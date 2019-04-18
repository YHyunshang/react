// Karma configuration
// Generated on Wed Jul 25 2018 18:07:09 GMT+0800 (CST)

module.exports = function(config) {
  config.set({
    //根路径配置
    basePath: '',
    // 测试框架
    frameworks: ['mocha', 'chai'],
    // 测试文件入口
    files: [
      './src/http/test.js',
      './_test_/*.js'
    ],
    // 需要排除的文件
    exclude: [
    ],
    // 文件测试前的环境编译
    preprocessors: {
      './src/http/test.js': ['babel', 'coverage'],
      './_test_/*.js': ['babel']
    },
    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed'
      },
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x'
      }
    },
    // 使用reporters为"coverage"时报告输出的类型和那目录
    coverageReporter: {
      reporters: [
        {type: 'html', dir: 'coverage/'},
        {type: 'text-summary'}
      ]
    },
    reporters: ['mocha', 'coverage'],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // 日志等级: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    // 并非级别
    concurrency: Infinity
  })
}
