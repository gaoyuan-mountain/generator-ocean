'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

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
        choices: ['react-redux-rxjs', 'react-redux-saga']
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { technologyStack, language } = this.props;

    this.fs.copy(
      this.templatePath(`${technologyStack}/${language}/**`),
      this.destinationPath('./'),
      { globOptions: { dot: true } }
    );
  }

  install() {
    // This.installDependencies();
  }
};
