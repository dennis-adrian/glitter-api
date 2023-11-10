# docker build -t registry.gitlab.com/garabatosdepandora/glitter-api .
# docker push registry.gitlab.com/garabatosdepandora/glitter/glitter-api

FROM node:20 AS builder

# working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# copy all files from current directory (source) to working directory (destination)
COPY . .

# create production build
RUN npm run build

FROM node:20

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# start app in production mode
CMD ["npm", "run", "start:prod"]
