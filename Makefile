build:
	./node_modules/coffee-script/bin/coffee -c index.coffee
	./node_modules/jade/bin/jade -P index.jade
	./node_modules/stylus/bin/stylus index.styl

server:
	./node_modules/http-server/bin/http-server

watch:
	watch make

.PHONY: build server watch
