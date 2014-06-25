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
        // this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Bayse generator!'));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the name of your project?',
        validate: function(input) { return (input.length ? true : "This field is required."); }
      },
      {
        type: 'confirm',
        name: 'coffee',
        message: 'Do you need CoffeeScript?',
        default: true
      },
      {
        type: 'confirm',
        name: 'myth',
        message: 'Do you need Myth?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.coffee = props.coffee;
      this.myth = props.myth;

      done();
    }.bind(this));
  },

  app: function () {

    if(this.coffee){
      this.directory('_coffee','coffee');
    }
    else{
      this.directory('_js','js');
    }
    
    if(this.myth){
      this.directory('_myth','myth');      
    }
    else{
      this.directory('_css','css');
    }

    this.directory('_img','img');
    this.directory('_vendor','vendor');
    this.copy('_index.html', 'index.html');

  },

  projectfiles: function () {
    
    // TODO - add prompt for project name, use in index, readme and package.json
    // see https://github.com/LeanMeanFightingMachine/StartingBlocks/blob/master/app/templates/_README.md
    // this.template("_README.md", "README.md"); <%= name %>

    this.copy('_package.json', 'package.json');
    this.copy('_README.md', 'README.md');
    // this.copy('editorconfig', '.editorconfig');

    if(this.coffee && this.myth){
      this.copy('_gulpfile.js', 'gulpfile.js');
    }

  }
});

module.exports = BayseGenerator;