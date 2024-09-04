# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install 

# Instalar Vite globalmente
RUN npm install -g vite
# Copiar el resto de la aplicación
COPY ./src ./src
# Copiar otros archivos que necesites como index.html o el archivo vite.config.js
COPY ./vite.config.js .
COPY ./index.html .
COPY .env.development .env.development

# Construir la aplicación para desarrollo 
#RUN npm run dev 
#RUN npm run build para producción cuando esté listo
# Exponer el puerto
EXPOSE 5173

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
#CMD ["npm", "run", "dev"] para producción cuando esté listo 
