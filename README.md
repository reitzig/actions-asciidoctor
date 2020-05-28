# Asciidoctor Setup Action

This Action can install
    [Asciidoctor]
to a virtual machine of GitHub Actions. 

## Example

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

      - uses: reitzig/actions-asciidoctor
        with:
          version: 2.0.10
          options: "-a experimental=true"

      - run: asciidoctor --version
```
