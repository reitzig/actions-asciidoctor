const core = require('@actions/core');
const exec = require('@actions/exec');
const fs  = require('fs');
const io = require('@actions/io');
const os = require('os')
const path = require('path')

function gemfile(version) {
    return `
        source 'https://rubygems.org'

        gem 'asciidoctor', '${version}'
    `
}

function wrapperScriptName(dir) {
    if ( os.platform() === 'win32') {
        return path.join(dir, 'asciidoctor.bat')
    } else {
        return path.join(dir, 'asciidoctor')
    }
}

function wrapperScript(executable, options) {
    if ( os.platform() === 'win32') {
        return `
            ruby ${executable} ${options} %*
        `
    } else {
        return `
            #!/bin/bash

            ruby "${executable}" ${options} "\$@"
        `
    }
}

async function run() {
    try {
        const asciidoctorVersion = core.getInput('version');
        const asciidoctorOptions = core.getInput('options');

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
        core.endGroup()

        core.startGroup('Wrap asciidoctor with options')
        let bundlePath = ''
        options.listeners = {
            stdout: (data) => {
                bundlePath += data.toString()
            }
        }
        await exec.exec('bundle', ['info', '--path', 'asciidoctor'], options)
        const asciidoctorExecutable = path.join(bundlePath.trim(), 'bin', 'asciidoctor')
        core.debug(`True asciidoctor at ${asciidoctorExecutable}`)

        const asciidoctorWrapper = wrapperScriptName(workdir)
        await fs.promises.writeFile(
            asciidoctorWrapper,
            wrapperScript(asciidoctorExecutable, asciidoctorOptions)
        )
        await fs.promises.chmod(asciidoctorWrapper, 0o755)
        await exec.exec('env')
        core.info(`Created ${asciidoctorWrapper}`)
        core.debug(wrapperScript(asciidoctorExecutable, asciidoctorOptions))
        core.addPath(path.resolve(workdir))

        await exec.exec('asciidoctor', ['--version'])
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
