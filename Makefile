build:
	./node_modules/coffee-script/bin/coffee -c index.coffee
	./node_modules/jade/bin/jade -P index.jade
	./node_modules/stylus/bin/stylus index.styl

.PHONY: build
