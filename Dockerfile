FROM node:24-bookworm-slim AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY resources ./resources
COPY public ./public
COPY scripts ./scripts
COPY vite.config.js ./
RUN npm run build


FROM composer:2 AS dependencies

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts


FROM php:8.3-cli-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends libicu-dev libonig-dev libxml2-dev \
    && docker-php-ext-install intl mbstring \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .
COPY --from=dependencies /app/vendor ./vendor
COPY --from=frontend /app/public ./public

RUN mkdir -p \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/views \
        storage/logs \
        bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && php artisan package:discover --ansi

CMD ["sh", "-c", "php artisan optimize && php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"]
