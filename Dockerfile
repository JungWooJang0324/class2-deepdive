# 베이스 이미지 설정 (Node.js)
FROM node:14

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# 서버가 바인딩할 포트 설정
EXPOSE 3000

# 애플리케이션 실행 명령어
CMD ["npm", "start"]