FROM node:20.5.1-slim

RUN npm install -g @nestjs/cli@10.1.17
RUN npm install -g pnpm@latest

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]