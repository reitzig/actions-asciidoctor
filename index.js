const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

function gemfile(version) {
    return `
        source 'https://rubygems.org'

        gem 'asciidoctor', '${version}'
    `
}

function wrapperScript(binary) {
    return `
        #!/usr/bin/env bash
        "${binary}" \\
            --attribute=experimental=true \\
            --attribute=icons=font \\
            "\$@"
    `
}

try {
  const asciidoctorVersion = core.getInput('version');
  const asciidoctorOptions = core.getInput('options');

  console.log(`Hello asciidoctor ${asciidoctorVersion}!`);
  console.log(gemfile(asciidoctorVersion))
  console.log(wrapperScript('foo'))
  
  /* TODO:
    - Setup Ruby (call that action?)
    - Write Gemfile
    - bundle install
    - create wrapper script
    - put wrapper script on PATH
    - asciidoctor -- version
  */
} catch (error) {
  core.setFailed(error.message);
}