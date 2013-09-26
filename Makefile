SRC = $(shell find . \( -name "*.js" \) -o \( -name node_modules -prune \) -type f | sort)

lint:
	@./node_modules/.bin/jshint ${SRC}

test:
	@./node_modules/.bin/mocha --reporter spec --ui tdd --recursive

.PHONY: lint test
