require 'open3'
require 'minitest'

options_and_check = {
    "":                     ->(result) { /<h1>/ =~ result && /<kbd>/ !~ result },
    "-a experimental=true": ->(result) { /<h1>/ =~ result && /<kbd>/ =~ result },
}

options_and_check.each do |options,check|
    stdout, stderr, status = Open3.capture3("asciidoctor #{options} -o - #{__dir__}/test.adoc")
    unless status.success?
        STDERR.puts(stderr)
        exit 1
    end

    fail unless check.call(stdout)
end
