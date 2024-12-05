FROM guergeiro/pnpm:latest

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN pnpm i -g http-server 
RUN pnpm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN pnpm run build-only

EXPOSE ${PORT}
CMD [ "http-server", "dist", "-c-1", "--proxy", "http://localhost:8080?" ]
