FROM library/postgres
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB docker-postgres
COPY schema.sql /docker-entrypoint-initdb.d/
COPY setup.sh /docker-entrypoint-initdb.d/