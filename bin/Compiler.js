const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

class Compiler {
  constructor(config){
    this.config = config;
    this.analyseObj = {};
  }

  readFile(modulePath) {
    return fs.readFileSync(modulePath, 'utf-8');
  }

  writeFile(modulePath, code) {
    fs.writeFileSync(modulePath, code);
  }

  run() {
    const entry = this.config.entry;
    this.depAnalyse(entry);

    this.emitFile();
  }

  depAnalyse(modulePath) {
    const content = this.readFile(modulePath);

    const ast = parser.parse(content);

    let dependencies = [];

    traverse(ast, {
      CallExpression(p) {
        if (p.node.callee.name === 'require') {
          p.node.callee.name = '__webpack_require__';
          dependencies.push(p.node.arguments[0].value);
        }
      }
    })

    const sourceCode = generate(ast).code;

    const relativePath = './' + path.relative(path.resolve('./src'), modulePath);

    this.analyseObj[relativePath] = sourceCode;

    dependencies.forEach(dep => {
      this.depAnalyse(path.resolve('./src', dep));
    })
  }

  emitFile() {
    const template = this.readFile(path.resolve('./bin/template.ejs'));

    const result = ejs.render(template, {
      entry: './' + path.relative(path.resolve('./src'), this.config.entry),
      modules: this.analyseObj
    })

    this.writeFile(this.config.output, result);
  }
}

module.exports = Compiler;