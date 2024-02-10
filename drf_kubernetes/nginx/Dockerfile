# Use an official Nginx base image
FROM nginx:latest

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/

# Expose the port on which Nginx will listen
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
