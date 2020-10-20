const core = require('@actions/core');
const exec = require('@actions/exec');
const fs  = require('fs');
const io = require('@actions/io');
const path = require('path')
const os = require('os')

function gemfile(version) {
    return `
        source 'https://rubygems.org'

        gem 'asciidoctor', '${version}'
    `
}

async function run() {
    try {
        const asciidoctorVersion = core.getInput('version');

        core.startGroup('Install asciidoctor')
        const workdir = 'actions_asciidoctor'
        await io.mkdirP(workdir)

        const gemfilePath = path.join(workdir, 'Gemfile')
        await fs.promises.writeFile(
            gemfilePath,
            gemfile(asciidoctorVersion)
        )
        core.info(`Created ${gemfilePath}`)

        await exec.exec('bundle', ['install'], { cwd: workdir })
        await exec.exec('asciidoctor', ['--version'])
        core.endGroup()
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
