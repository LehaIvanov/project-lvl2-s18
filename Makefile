install:
	npm install
start:
	npm run babel-node -- 'src/bin/gendiff.js' -f plain ~/hexlet-lvl2-resources/before.json ~/hexlet-lvl2-resources/after.json
publish:
	npm publish
lint:
	npm run eslint
build:
	rm -rf dist
	npm run build
test:
	npm test
test-watch:
	npm test -- --watch