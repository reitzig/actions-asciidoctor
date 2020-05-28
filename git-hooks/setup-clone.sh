#!/usr/bin/env bash

git config core.hooksPath "$(realpath "$0" | xargs dirname | xargs basename)"