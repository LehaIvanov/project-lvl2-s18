install:
	npm install
start:
	npm run babel-node -- 'src/bin/gendiff.js' -f plain __tests__/resources/nested/before.json __tests__/resources/nested/after.json
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