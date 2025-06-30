      sleep 5;
      /usr/bin/mc alias set dockerminio http://minio:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD;
      /usr/bin/mc mb dockerminio/$MINIO_BUCKET;
      /usr/bin/mc anonymous set download dockerminio/$MINIO_BUCKET;
      cd /images 
      for image in *;
      do 
        /usr/bin/mc put $image dockerminio/$MINIO_BUCKET;
      done
      exit 0;
      