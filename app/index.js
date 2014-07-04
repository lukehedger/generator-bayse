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
    this.log(yosay('Welcome to the marvellous Bayse generator!'));
    this.log(chalk.magenta('Out of the box I include an HTML5 boilerplate, jQuery and RequireJS to build your app.'));

    var prompts = [
      {
        type: 'checkbox',
        name: 'features',
        message: 'What else would you like to include?',
        choices: [{
          name: 'CoffeeScript',
          value: 'coffee',
          checked: false
        }, {
          name: 'Myth',
          value: 'myth',
          checked: false
        }]
      },
      {
        type: 'input',
        name: 'name',
        message: 'Cool. So what\'s the name of your project?',
        validate: function(input) { return (input.length ? true : "This field is required."); }
      },
      {
        type: 'input',
        name: 'description',
        message: 'And what will it do?'
      },
    ];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.description = props.description;

      var features = props.features,
      hasFeature = function (feat) {
        return features.indexOf(feat) !== -1;
      }
      this.coffee = hasFeature('coffee');
      this.myth = hasFeature('myth');

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
    this.template('_index.html', 'index.html');

  },

  projectfiles: function () {

    this.copy('_package.json', 'package.json');
    this.template('_README.md', 'README.md');

    if(this.coffee || this.myth){
      this.template('_gulpfile.js', 'gulpfile.js');
    }

  }
});

module.exports = BayseGenerator;