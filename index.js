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

function wrapperScript(executable, options) {
    if ( os.platform() === 'win32') {
        return {
            name: 'asciidoctor.bat',
            content: `
                ruby ${executable} ${options} %*
            `.trim()
        }
    } else {
        return {
            name: 'asciidoctor',
            content: `
                #!/bin/bash

                ruby "${executable}" ${options} "\$@"
            `.trim()
        }
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

        const asciidoctorWrapper = wrapperScript(asciidoctorExecutable, asciidoctorOptions)
        asciidoctorWrapper.path = path.join(workdir, asciidoctorWrapper.name)
        await fs.promises.writeFile(
            asciidoctorWrapper.path,
            asciidoctorWrapper.content
        )
        await fs.promises.chmod(asciidoctorWrapper.path, 0o755)
        await exec.exec('env')
        core.info(`Created ${asciidoctorWrapper.path}`)
        core.debug(asciidoctorWrapper.content)
        core.addPath(path.resolve(workdir))

        await exec.exec('asciidoctor', ['--version'])
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
