FROM library/postgres
ENV POSTGRES_USER main
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB docker-postgres
COPY schema.sql /docker-entrypoint-initdb.d/