FROM node:lts-alpine AS builder

COPY . /app/front

WORKDIR /app/front

RUN npm ci
RUN npm run build

# Use an Nginx image for serving the built app
FROM nginx:alpine
WORKDIR /app/
# Copy the built files to the Nginx directory
COPY --from=builder /app/front/dist /usr/share/nginx/html
# Add a custom Nginx config to support client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf



# Expose the port
EXPOSE 80
# Start Container
CMD ["nginx", "-g", "daemon off;"]
