FROM node:16.16.0-alpine3.16 

# Create app directory
WORKDIR /app



# Install required packages
RUN apk update && apk add --no-cache git openssl libc6-compat

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/


ENV SECRET "SuperSecret"

# Install app dependencies
RUN npm install 

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
ENV DATABASE_URL="postgresql://postgres:123@postgres:5432/nest?schema=public"
RUN apk add --no-cache libc6-compat git openssl
RUN npx prisma generate
# RUN npx prisma db seed
RUN yarn run build
EXPOSE 8080

CMD [  "npm", "run", "start" ]

