## Http-Node

Aplicación Node.js + Express conectada a MySQL para exponer una API HTTP y mostrar un dashboard web de monitoreo de requests.

## Estructura

- `/Backend`: API REST, conexión a base de datos, servicios y middleware de logs.
- `/Frontend`: dashboard estático (HTML/CSS/JS) servido por el backend.

## Requisitos

- Node.js 18+ (recomendado)
- MySQL en ejecución

## Variables de entorno

Crear el archivo `/home/runner/work/Http-Node/Http-Node/Backend/.env` con:

```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_DATABASE=tu_base_de_datos
PORT=3000
```

## Instalación

Desde la raíz del proyecto:

```bash
npm install
cd Backend && npm install
```

## Ejecución

Desde la raíz del proyecto:

```bash
npm run start
```

Para desarrollo con reinicio automático:

```bash
npm run dev
```

La app quedará disponible en `http://localhost:3000`.

## Endpoints principales

Base URL: `http://localhost:3000/api`

- `GET /status`
- `GET /logs`
- `GET /logs/count`
- `POST /usuarios`
- `GET /usuarios`
- `POST /proveedores`
- `GET /proveedores`
- `POST /pedidos`
- `GET /pedidos`
- `GET /pedidos/:id`
- `POST /cuentas-de-presupuesto`
- `GET /cuentas-de-presupuesto`
- `POST /articulos-pedido`
- `GET /articulos-pedido`
- `GET /articulos-pedido/:PedidoId`
- `POST /pedidos/full`

## Dashboard

El frontend muestra:

- Total de requests
- Cantidad de errores
- Latencia promedio
- Estado del servidor
- Tabla de logs recientes
- Gráfica de requests por método HTTP
