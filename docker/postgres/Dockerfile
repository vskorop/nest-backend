FROM postgres:12

RUN apt-get clean && apt-get update && \
    apt-get install -y postgresql-contrib \
    -e 'PGADMIN_DEFAULT_EMAIL=user' \
    -e 'PGADMIN_DEFAULT_PASSWORD=123' 

COPY init-pgcrypto.sql /docker-entrypoint-initdb.d/
COPY init-uuid.sql /docker-entrypoint-initdb.d/

ADD *.sql /docker-entrypoint-initdb.d/