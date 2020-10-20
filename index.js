const core = require('@actions/core');
const exec = require('@actions/exec');
const fs  = require('fs');
const io = require('@actions/io');
const path = require('path')

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

        const options = {
            cwd: workdir
        }
        await exec.exec('bundle', ['config', 'set', 'path', `vendor/bundle`], options)
        await exec.exec('bundle', ['install'], options)

        if (core.isDebug()) {
            await exec.exec('bundle', ['info', '--path', 'asciidoctor'], options)
            const asciidoctorExecutable = path.join(bundlePath.trim(), 'bin', 'asciidoctor')
            core.debug(`asciidoctor installed at ${asciidoctorExecutable}`)
        }
        await exec.exec('asciidoctor', ['--version'])
        core.endGroup()
    } catch (error) {
        core.setFailed(error.message);
    }
}

// TODO: include call to "setup ruby"

run()
