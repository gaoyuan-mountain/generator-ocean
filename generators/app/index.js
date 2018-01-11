'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the ace ' + chalk.red('generator-ocean') + ' generator!'));

    const prompts = [
      {
        type: 'list',
        name: 'language',
        message: 'Please choose language:',
        choices: ['es6', 'typescript']
      },
      {
        type: 'list',
        name: 'technologyStack',
        message: 'Please choose technology stack:',
        choices: [
          'react-redux-rxjs',
          'react-redux-saga',
          'ocean-framework',
          'ocean-child-app'
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { technologyStack, language } = this.props;

    if (['react-redux-rxjs', 'react-redux-saga'].includes(technologyStack)) {
      this.fs.copy(
        this.templatePath(`${technologyStack}/${language}/**`),
        this.destinationPath('./'),
        { globOptions: { dot: true } }
      );
    } else if (technologyStack === 'ocean-framework') {
      // 先把文件全拷贝过去
      this.fs.copy(
        this.templatePath(`${technologyStack}/${language}/**`),
        this.destinationPath('./'),
        { globOptions: { dot: true } }
      );
      // 重新生成需要做模版替换的文件
      const dest = process.cwd();
      const projectName = path.basename(dest);
      const files = [
        './package.json',
        './readme.md',
        './webpack.config.js',
        './webpack.prod.config.js'
      ];
      files.forEach(_file => {
        this.fs.delete(this.destinationPath(_file));
        this.fs.copyTpl(
          this.templatePath(`${technologyStack}/${language}/${_file}`),
          this.destinationPath(`./${_file}`),
          { projectName }
        );
      });
    } else if (technologyStack === 'ocean-child-app') {
      // 先检查是否是在ocean-framework下建立child-app
      // 两个判断条件：
      // 1. 当前目录是src
      // 2. ../package.json存在并且里面"framework": "ocean-one"
      if (!fs.existsSync(path.join(process.cwd(), '../../src'))) {
        this.log(
          chalk.red(
            'ocean-child-app must in ocean-framework, path is ./ocean-app/src/xxxx'
          )
        );
        throw new Error('ocean-child-app must in ocean-framework');
      }

      if (this.fs.exists(path.join(process.cwd(), '../../package.json'))) {
        const _package = JSON.parse(
          fs.readFileSync(path.join(process.cwd(), '../../package.json'), 'utf8')
        );
        if (_package.framework !== 'ocean-one') {
          this.log(
            chalk.red(
              'ocean-child-app must in ocean-framework, path is ./ocean-app/src/xxxx'
            )
          );
          throw new Error('ocean-child-app must in ocean-framework');
        }
      } else {
        this.log(
          chalk.red(
            'ocean-child-app must in ocean-framework, path is ./ocean-app/src/xxxx'
          )
        );
        throw new Error('ocean-child-app must in ocean-framework');
      }

      // 先把文件全拷贝过去
      this.fs.copy(
        this.templatePath(`${technologyStack}/${language}/**`),
        this.destinationPath('./'),
        { globOptions: { dot: true } }
      );
      // 重新生成需要做模版替换的文件
      const dest = process.cwd();
      const projectName = path.basename(dest);
      const files = ['./ocean.js', './entry.js'];
      files.forEach(_file => {
        this.fs.delete(this.destinationPath(_file));
        this.fs.copyTpl(
          this.templatePath(`${technologyStack}/${language}/${_file}`),
          this.destinationPath(`./${_file}`),
          { projectName }
        );
      });
    }
  }

  install() {
    // This.installDependencies();
  }
};
