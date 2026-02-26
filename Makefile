.PHONY: help build up down restart logs clean

help:
	@echo "Park Monitoring - Available commands:"
	@echo ""
	@echo "  make build          - Build both frontend and backend images"
	@echo "  make up             - Start both frontend and backend containers"
	@echo "  make down           - Stop and remove all containers"
	@echo "  make restart        - Restart all containers"
	@echo "  make logs           - Show logs from all services"
	@echo "  make logs-backend   - Show backend logs"
	@echo "  make logs-frontend  - Show frontend logs"
	@echo "  make clean          - Remove containers, volumes and unused images"
	@echo "  make dev            - Start services in development mode (local npm dev)"
	@echo ""

build:
	@echo "Building frontend and backend images..."
	docker-compose build

up:
	@echo "Starting frontend and backend services..."
	docker-compose up -d
	@echo ""
	@echo "Services started:"
	@echo "  Frontend:  http://localhost:3000"
	@echo "  Backend:   http://localhost:8080"
	@echo "  API Docs:  http://localhost:8080/swagger/"

down:
	@echo "Stopping all services..."
	docker-compose down

restart:
	@echo "Restarting all services..."
	docker-compose restart
	@echo "Services restarted successfully"

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

clean:
	@echo "Cleaning up containers and volumes..."
	docker-compose down -v
	docker system prune -f
	@echo "Cleanup complete"

ps:
	docker-compose ps

dev:
	@echo "Starting backend in Docker..."
	docker-compose up -d backend
	@echo ""
	@echo "Backend is running on http://localhost:8080"
	@echo ""
	@echo "Starting frontend in development mode..."
	@echo "Frontend will be available on http://localhost:3000"
	@echo ""
	cd client && npm run dev

build-rebuild:
	@echo "Rebuilding images without cache..."
	docker-compose build --no-cache

.DEFAULT_GOAL := help
