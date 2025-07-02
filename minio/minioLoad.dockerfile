FROM minio/minio:RELEASE.2025-06-13T11-33-47Z-cpuv1

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "entrypoint.sh" ]