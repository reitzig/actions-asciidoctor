# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and 
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

No additional changes yet.

## [2.0.0] - 2020-10-21

### Removed

 - Input `options` no longer available. 
   [[#3](https://github.com/reitzig/actions-asciidoctor/issues/3)]

   Add options to each call instead. 
   Hugo users should make use of what configuration the 
     [external helper](https://gohugo.io/content-management/formats/#external-helper-asciidoctor)
   offers.

### Changed

 - Install gem to the system's default location.

## [1.1.0] - 2020-10-03

### Security

 - Bump dependency `@actions/core` 
   [[#5](https://github.com/reitzig/actions-asciidoctor/pull/5)]

## [1.0.0] - 2020-05-29

Initial release. 
