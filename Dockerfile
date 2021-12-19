# Specify Base image
FROM node:14-alpine

# Specifying workdir
WORKDIR /usr/app

# install dependencies

# package.json will only be installed when the package.json file is changed
COPY ./package.json ./
RUN npm install

COPY ./ ./

# Default command
CMD ["npm" , "start"]