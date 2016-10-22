FROM node

MAINTAINER Heinrich Latreider, heinrich.latreider@haw-hamburg.de

WORKDIR /home/mi_data_aquisition

# Install packages
ADD package.json /home/mi_data_aquisition/package.json
RUN npm install

# Make everything available for start
ADD . /home/mi_data_aquisition

# currently only works for development
ENV NODE_ENV development

CMD ["npm", "start"]
