include .env
export

back-run:
	cd ./backend/ && \
	go run main.go
	
front-run:
	cd ./frontend/ && \
	npm run dev

migrate-up:
	migrate -path ./backend/migrations -database ${CONN_STR} up

migrate-down:
	migrate -path ./backend/migrations -database ${CONN_STR} down