# Manejo de Sesiones 

## Sesión

Es un mecanismo que mantiene el estado entre multiples peticiones HTTP de un mismo usuario, debido a que HTTP es un protocolo sin estado. Por lo tanto, la sesión es un contexto temporal asociado a un usuario y permite: 

* Identificarlo
* Guardar información relevante 
* Dar continuidad en la interacción

## Como funciona 

Cliente --> login
Servidor --> crea una sesion y le asigna un ID 
Cliente --> Guarda ese ID=abc1123 (cookie, localStorage, sessionStorage, Objeto JS, BaseDatos del Navegador)

Cliente --> nueva peticion, debe enviar su ID 
Servidor --> busca el ID de la sesión y reconoce al usuario 

## Claves de funcionamiento 

* La sesión se guarda en el servidor y contiene los datos del usuario 
* La cookie se guarda en el cliente y contiene el ID de la sesión 

## Almacenamiento en el cliente 

* localStorage --> accecible vía JS y es persistente 
* sessionStorage --> Util para estados intermedios, se elimina al cerrar la pestaña 
* Variable en memoria de JS --> No es persistente 
* IndexDB --> Base de datos en el navegador 
* Cookies --> Configurable y de mayor seguridad con httpOnly 
