# Resource CRUD: Node.js (Typescript) - ExpressJS - MongoDB - Docker

This project is a TypeScript-based Node.js application using Express and Mongoose, containerized with Docker for easy deployment and development.

## 🚀 Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.
- [Yarn](https://yarnpkg.com/) (optional, for local development).

---

## 🛠️ Installation & Setup

### 1. Environment Configuration
The application uses environment variables for configuration. Update environment in `services/app/environment` in `docker-compose.yml`:

```env
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
MONGO_URI=mongodb://mongodb:27017/99tech_problem5
```
Note: When running via Docker Compose, use mongodb as the hostname in the MONGO_URI instead of localhost.

### 2. Build and Run with Docker
Use Docker Compose to build the application image and start the MongoDB database container.
```bash
# Build and start containers in the background
docker-compose up --build -d
```

### 3. Verify the Setup
Check if the containers are running correctly:
```bash
docker-compose ps
```

To view the application logs:
```bash
docker-compose logs -f app
```

## 🏗️ Project Architecture

The project follows a layered architecture to separate concerns effectively:

* **`src/configs`**: Application configurations (CORS, Environment, MongoDB connection).
* **`src/exceptions`**: Custom HTTP error handling and global exception classes.
* **`src/modules/resource`**: Contains the core business logic:
    * `dtos`: Data Transfer Objects for request validation.
    * `entities`: Mongoose schemas and interfaces.
    * `resource.controller.ts`: Handles incoming HTTP requests.
    * `resource.service.ts`: Contains business logic.
    * `resource.repository.ts`: Handles database operations (Abstracted from Service).
    * `resource.router.ts`: Route definitions for the resource feature.
* **`src/middlewares`**: Security, validation, logging (Morgan), and response formatting.
* **`src/routes`**: Centralized route registry (`index.ts`).
* **`src/shared`**: Reusable base classes, constants, and utility functions.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (v20+)
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Validation**: Class-validator / Class-transformer
- **Containerization**: Docker & Docker Compose
- **Package Manager**: Yarn

## 🚦 API Endpoints

The following endpoints are available for the Resource feature. All endpoints are prefixed with the base URL.

**Base URL**: `http://localhost:3000/api/resource`

---

### 1. List Resources
Retrieve a list of resources with support for pagination and filtering.

* **URL**: `/`
* **Method**: `GET`
* **Query Parameters**:
    | Parameter | Type | Description |
    | :--- | :--- | :--- |
    | `page` | `number` | Page number for pagination (default: 1) |
    | `limit` | `number` | Number of items per page (default: 10) |
    | `resourceName` | `string` | Search resources by name |
    | `isActive` | `boolean` | Filter by active/inactive status |

* **Example Request**:
    `GET http://localhost:3000/api/resource?page=1&limit=10&isActive=true`

---

### 2. Resource Details
Retrieve details of a resource.

* **URL**: `/:id`
* **Method**: `GET`

---

### 3. Create or Update Resource
Create a new resource record or overwrite an existing one using a specific ID.

* **URL**: `/:id`
* **Method**: `POST`
* **Request Body**:
    ```json
    {
      "resourceName": "resourseNameExample",
      "resourceDescription": "resourceDescExample"
    }
    ```

---

### 4. Partial Update Resource
Modify specific fields of an existing resource without affecting other properties.

* **URL**: `/:id`
* **Method**: `PATCH`
* **Request Body**:
    ```json
    {
      "resourceName": "resourceName updated",
      "resourceDescription": null,
      "isActive": false
    }
    ```

---

### 5. Delete Resource
Hard delete a resource from the database using its unique identifier.

* **URL**: `/:id`
* **Method**: `DELETE`
* **Success Response**: `200 OK`

### 🏥 Health Check
Monitor the application and database connectivity status.

* **URL**: `/api/health`
* **Method**: `GET`
* **Success Response**:
    * **Code**: `200 OK`
    * **Content**: 
      ```json
      {
        "status": "healthy",
        "uptime": 124.5,
        "timestamp": "2025-12-18T12:00:00Z",
        "checks": {
          "database": "up",
          "server": "up"
        }
      }
      ```
* **Error Response**:
    * **Code**: `503 SERVICE UNAVAILABLE` (if MongoDB is disconnected).

---

### 🛡️ Request Security Note
Every request undergoes the following automated checks:
1.  **XSS Sanitization**: Input like `<script>` in `resourceDescription` is automatically stripped.
2.  **DTO Validation**: Requests missing `resourceName` or containing invalid types will receive a `400 Bad Request`.
3.  **Security Headers**: All responses include `Helmet` security headers by default.

## 🛡️ Security and Request Sanitization

The application implements multiple layers of security to protect against common web vulnerabilities (OWASP Top 10).

### 1. HTTP Header Security (Helmet)
We use **Helmet.js** to secure the Express app by setting various HTTP headers. This helps prevent attacks such as:
* **Clickjacking**: via `X-Frame-Options`.
* **MIME-type sniffing**: via `X-Content-Type-Options`.
* **Cross-Site Scripting (XSS)**: via `Content-Security-Policy`.
* **Information Leakage**: By removing the `X-Powered-By` header.

### 2. Cross-Site Scripting (XSS) Sanitization
To protect the database and users from malicious script injections, the application includes a global sanitization layer:
* **`sanitize.config.ts`**: Defines the rules and whitelist for the `xss` library.
* **`security.middleware.ts`**: A custom middleware that intercepts `req.body`, `req.query`, and `req.params`. It recursively strips any dangerous HTML tags or JavaScript attributes (e.g., `<script>`, `onerror`, `onclick`) from the input data before it reaches the controllers.

### 3. Data Integrity & Validation
* **CORS**: Configured in `configs/cors.config.ts` to restrict API access to authorized domains only.
* **Request Validation**: The `request-validation.middleware.ts` uses `class-validator` and DTOs to ensure that incoming data strictly conforms to expected types and formats, rejecting any "over-posted" or malformed fields.
---

## 🛠️ Implementation Overview

### Security Middleware Logic
The security configuration is initialized in `src/server.ts` and managed through the following flow:

1. **Helmet**: Applied globally to set secure headers.
2. **CORS**: Applied to handle Cross-Origin Resource Sharing.
3. **XSS Filter**: A recursive function cleans all user input.
4. **Validation**: `class-validator` ensures data matches the defined DTOs in `modules/resource/dtos`.
