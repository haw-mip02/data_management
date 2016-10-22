FROM node

MAINTAINER Heinrich Latreider, heinrich.latreider@haw-hamburg.de

WORKDIR /home/mi_data_aquisition

# Install Mean.JS Prerequisites
#RUN npm install -g grunt-cli
RUN npm install -g node

# Install Mean.JS packages
ADD package.json /home/mi_data_aquisition/package.json
RUN npm install

# Make everything available for start
ADD . /home/mi_data_aquisition

# currently only works for development
ENV NODE_ENV development

# Port 3000 for server
# Port 35729 for livereload
#EXPOSE 3000 35729
CMD ["npm", "start"]
