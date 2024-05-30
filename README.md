[![license](https://img.shields.io/github/license/reitzig/actions-asciidoctor.svg)](https://github.com/reitzig/actions-asciidoctor/blob/master/LICENSE)
[![release](https://img.shields.io/github/release/reitzig/actions-asciidoctor.svg)](https://github.com/reitzig/actions-asciidoctor/releases/latest)
[![GitHub release date](https://img.shields.io/github/release-date/reitzig/actions-asciidoctor.svg)](https://github.com/reitzig/actions-asciidoctor/releases)
![Test](https://github.com/reitzig/actions-asciidoctor/workflows/Test/badge.svg?branch=master&event=push)

# Asciidoctor Setup Action

This Action can install
    [Asciidoctor](https://asciidoctor.org/)
to a virtual machine of GitHub Actions. 


## Usage

Given that Ruby has already been installed 
(e.g. by [ruby/setup-ruby](https://github.com/marketplace/actions/setup-ruby-jruby-and-truffleruby)), 
include this in your workflow:

```yml
 - uses: reitzig/actions-asciidoctor@v2.0.2
```

These inputs are allowed:

 - `version` -- a [Gemfile-compatible version string](https://guides.rubygems.org/patterns/#declaring-dependencies)  
   _Default:_ empty; installs the latest version.

### Working Example

```yml
name: Asciidoctor Demo

on:
  push:
    branches:
      - master

jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: 2.7

      - uses: reitzig/actions-asciidoctor@v2.0.2
        with:
          version: 2.0.18

      - run: asciidoctor --version
```


## Acknowledgements

 - [@peaceiris](https://github.com/peaceiris) lent inspiration, 
   [example](https://github.com/peaceiris/actions-hugo), and 
   [pointers](https://github.com/reitzig/today-i-learned/pull/1/).
 - A bunch of Stackoverflow answers helped cobble this together.
 - Parts of this project were created during 
     [20% time](https://en.wikipedia.org/wiki/20%25_Project) 
   graciously provided by 
     [codecentric](https://codecentric.de).
   Thank you!
