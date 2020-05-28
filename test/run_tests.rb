require 'open3'
require 'minitest'

stdout, stderr, status = Open3.capture3("asciidoctor -o - #{__dir__}/test.adoc")
unless status.success?
    STDERR.puts(stderr)
    exit 1
end

case ARGV[0]
when "without_options"
    fail unless /<kbd>/ !~ stdout
when "with_experimental"
    fail unless /<kbd>/ =~ stdout
else
    raise 'no such test'
end
