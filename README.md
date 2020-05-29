[![license](https://img.shields.io/github/license/reitzig/actions-asciidoctor.svg)](https://github.com/reitzig/actions-asciidoctor/blob/master/LICENSE)
[![release](https://img.shields.io/github/release/reitzig/actions-asciidoctor.svg)](https://github.com/reitzig/actions-asciidoctor/releases/latest)
[![GitHub release date](https://img.shields.io/github/release-date/reitzig/actions-asciidoctor.svg)](https://github.com/reitzig/actions-asciidoctor/releases)
![Test](https://github.com/reitzig/actions-asciidoctor/workflows/Test/badge.svg?branch=master&event=push)

# Asciidoctor Setup Action

This Action can install
    [Asciidoctor](https://asciidoctor.org/)
to a virtual machine of GitHub Actions. 


## Usage

Given that Ruby has already been installed, include this in your workflow:

```yml
 - uses: reitzig/actions-asciidoctor@v1
```

These inputs are allowed:

 - `version` -- a [Gemfile-compatible version string](https://guides.rubygems.org/patterns/#declaring-dependencies)  
   _Default:_ empty; installs the latest version.
 
 - `options` -- command-line parameters that will be applied to _all_ calls to `asciidoctor`.  
   _Default:_ empty.

### Working Example

```yml
name: Asciidoctor Demo

on:
  push:
    branches:
      - master

jobs:
  example:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: 2.7

      - uses: reitzig/actions-asciidoctor@v1
        with:
          version: 2.0.10
          options: "-a experimental=true"

      - run: asciidoctor --version
```


## Credits

 - @peaceiris lent inspiration, 
   [example](https://github.com/peaceiris/actions-hugo), and 
   [pointers](https://github.com/reitzig/today-i-learned/pull/1/).
 - A bunch of Stackoverflow answers helped cobble this together.
