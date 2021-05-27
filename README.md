Proyecto Final Asignatura Hyperledger Indy -> Prueba de Concepto.

Pasos para el deploy:

1. Iniciar indy
  - docker run -itd -p 9701-9708:9701-9708 --network host indy_pool

2. Dentro de la carpeta front-indy:
  - npm install
  - npm run serve
3. Dentro de la carpeta back-indy
  - npm install
  - npm start
4. Se puede utilizar la colección exportada del Postman para conocer la estructura de las peticiones y respuestas  
