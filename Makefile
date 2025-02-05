# Makefile

install:
	npm ci

lint:
	npx eslint .

build: 
	npm run build

start:
	npx start-server -s ./frontend/dist
