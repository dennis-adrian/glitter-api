FROM node:20

# working directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# copy all files from current directory (source) to working directory (destination)
COPY . .

# create production build
RUN npm run build

EXPOSE 3000

# start app in production mode
CMD ["npm", "run", "start:prod"]