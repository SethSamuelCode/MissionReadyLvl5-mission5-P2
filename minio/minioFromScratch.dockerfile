FROM alpine
RUN apk add --no-cache curl 
RUN curl https://dl.min.io/client/mc/release/linux-amd64/mc \
  --create-dirs \
  -o /minio-binaries/mc

RUN chmod +x /minio-binaries/mc
# RUN export PATH=$PATH:$HOME/minio-binaries/

# RUN apt-get update
# RUN apt-get upgrade -y
# RUN apt-get install wget sed -y
# RUN wget https://go.dev/dl/go1.24.4.linux-amd64.tar.gz
# RUN rm -rf /usr/local/go && tar -C /usr/local -xzf go1.24.4.linux-amd64.tar.gz
# RUN export PATH=$PATH:/usr/local/go/bin
# RUN go install github.com/minio/mc@latest 

COPY entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//g' /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/bin/sh","entrypoint.sh" ]