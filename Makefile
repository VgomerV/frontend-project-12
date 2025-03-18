# Makefile

install:
	npm ci

lint-frontend:
	make -C frontend lint

build: 
	npm run build

start:
	npx start-server -s ./frontend/dist
