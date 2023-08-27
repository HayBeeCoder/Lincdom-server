# Use an official PostgreSQL image as the base image
FROM postgres:latest

# Environment variables for PostgreSQL configuration
ENV POSTGRES_USER haybeecodes   
ENV POSTGRES_PASSWORD 1234567890
ENV POSTGRES_DB projecktdb

# Expose PostgreSQL port
EXPOSE 5432