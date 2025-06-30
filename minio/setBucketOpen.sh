#!/bin/sh

# Wait to ensure MinIO is up
sleep 20

# Set mc alias
mc alias set myminio http://localhost:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD

mc mb myminio/$MINIO_BUCKETS

# Set public read policy on the bucket
mc anonymous set download myminio/$MINIO_BUCKETS