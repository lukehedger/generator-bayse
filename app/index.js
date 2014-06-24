'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BayseGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Bayse generator!'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {

    this.directory('coffee','coffee');
    this.directory('css','css');
    this.directory('js','js');
    this.directory('img','img');
    this.directory('myth','myth');
    this.directory('vendor','vendor');
    this.copy('index.html', 'index.html');

  },

  projectfiles: function () {

    this.copy('_package.json', 'package.json');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('README.md', 'README.md');
    // this.copy('editorconfig', '.editorconfig');

  }
});

module.exports = BayseGenerator;