# Koristi prikladnu osnovnu sliku za Nuxt aplikaciju
FROM node:18-alpine

# Postavi radni direktorij
WORKDIR /app

# Kopiraj package.json i package-lock.json
COPY package*.json ./

# Instaliraj ovisnosti
RUN npm install

# Kopiraj sve ostale datoteke
COPY . .

# Izgradi aplikaciju
RUN npm run build

# Expose port
EXPOSE 3000

# Pokreni aplikaciju
CMD ["npm", "run", "dev"]
