const vm = require ('vm');
const fs = require ('fs');


// Gobble up a JSON file with comments
function getJSON(filepath) {
  const jsonString = "g = " + fs.readFileSync(filepath, 'utf8') + "; g";
  return (new vm.Script(jsonString)).runInNewContext();
}

exports.default = function * (fly) {
  yield fly.serial(['build']);
}

exports.clean = function * (fly) {
  yield fly.clear(['build', 'coverage']);
}

exports.superclean = function * (fly) {
  fly.parallel(['clean']);
  yield fly.clear(['node_modules'])
}

exports.mrproper = function * (fly) {
  fly.parallel(['superclean']);
  yield fly.clear(['dist'])
}

exports.buildozer = function * (fly) {
  let tsopts = getJSON('./tsconfig.json')
    ;
  
  yield fly.source("src/**/*.ts")
    .typescript(tsopts)
    .target("build/src")
}


exports.build = function * (fly) {
  yield fly.source("src/**/*.ts")
    .shell("tsc --outDir build/src --rootDir src")
}


exports.dist = function * (fly) {
  yield fly.serial(['build'])
    .source(['build/src/**/*.js','build/src/**/*.d.ts'])
    .target('dist')
}

exports.spec = function * (fly) {
  yield fly.source("./test/**/*.jest.ts")
    .shell({
        cmd: 'jest --coverage $glob'
      , preferLocal: true
      , glob: true
    })
}

exports.lint = function * (fly) {
  yield fly.source('./{src,test}/**/*.ts')
    .shell('tslint $glob')
}