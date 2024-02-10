FROM python:3.9-alpine

WORKDIR /app

# Install system dependencies
RUN apk update && apk add --no-cache \
    pkgconfig \
    mariadb-dev \
    build-base \
    python3-dev \
    mysql-dev

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN chmod +x /app/script.sh

CMD ["./script.sh"]