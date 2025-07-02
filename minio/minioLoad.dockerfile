FROM minio/minio:RELEASE.2025-06-13T11-33-47Z-cpuv1

COPY entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//g' /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/bin/sh","entrypoint.sh" ]