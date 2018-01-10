'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const basename = require('path').basename;

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
          'ocean-child'
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
      const projectName = basename(dest);
      const files = [
        './package.json',
        './readme.json',
        './webpack.config.json',
        './webpack.prod.config.json'
      ];
      const ctx = this;
      files.forEach(_file => {
        ctx.fs.unlinkSync(ctx.destinationPath(_file));
        ctx.fs.copy(ctx.templatePath(_file), ctx.destinationPath(_file), { projectName });
      });
    }
  }

  install() {
    // This.installDependencies();
  }
};
