#!/bin/sh
sleep 5
/minio-binaries/mc alias set dockerminio http://minio:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD
/minio-binaries/mc mb dockerminio/$MINIO_BUCKET
/minio-binaries/mc anonymous set download dockerminio/$MINIO_BUCKET
cd /images 
for image in *;
do 
/minio-binaries/mc put $image dockerminio/$MINIO_BUCKET
done
exit 0
