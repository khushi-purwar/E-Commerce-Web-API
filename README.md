# E-Commerce-Web-API
>Real World Backend RESTful API For E-Commerce Platform Ready for Mobile or Web E-Shop Application

### Tech Stacks Used
<a href="https://nodejs.org/" title="Node.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="Node.js" width="60px" height="60px"></a>
<a href="https://expressjs.com/" title="Express"><img src="https://github.com/get-icon/geticon/raw/master/icons/express.svg" alt="Express" width="60px" height="60px"></a>
<a href="https://www.mongodb.org/" title="MongoDB"><img src="https://github.com/get-icon/geticon/raw/master/icons/mongodb-icon.svg" alt="MongoDB" width="60px" height="60px"></a>

### How to run project?

1. Clone the project `git clone https://github.com/khushi-purwar/E-Commerce-Web-API.git`
2. Navigate to the project directory `cd E-Commerce-Web-API`
3. Install neccesary packages, modules `npm install`
4. To run the project `npm run dev` in development mode or `npm run prod` in production mode.
5. Using POSTMAN you can use this default value of DOMAIN as `http://localhost:4000`
6. To get dummy products in your database, run `npm seeder`.


### Features
1. Authentication & Authorization using JWT
2. Manage User Roles (customer & admin)
3. Added Product, User & Order Routes
4. Adding Filter, Pagination, Search API on Product
5. Handling and logging errors the right way
6. Handle Checkout & Payments using Stripe
7. Implementing CRUD operations like, product can be add, update or delete, etc.
8. Forgot & Reset Password

## Endpoints
Base URL = http://localhost:4000/api/v1

### 1. Product routes

|Endpoint |HTTP Method | Description | Auth Required |
| --- | --- | --- | --- |
| `/admin/product` |`post` |Admin can create new product | Yes |
| `/products` | `get` | Get all products | No|
| `/product/:id` |`get` | Get specific product by its id | No |
| `/admin/product/:id` |`put` | Update a product using id | Yes |
| `/admin/product/:id` |`delete` | Delete specific product by its id | Yes |

### 2. Auth routes

|Endpoint |HTTP Method | Description | Auth Required |
| --- | --- | --- | --- |
| `/register` |`post` |Register a user | No |
| `/login` |`post` |Login a user | No |
| `/logout` |`get` |Logout user | No |
| `/password/forgot` |`post` |Forgot Password | No |
| `/password/reset/:token` |`put` |Reset Password | No |

### 3. User routes

|Endpoint |HTTP Method | Description | Auth Required |
| --- | --- | --- | --- |
| `/me` |`get` |Get user profile | Yes |
| `/me/update` |`put` |Change or Update user profile | Yes |
| `/admin/users` |`get` |Get all user by Admin | Yes |
| `/admin/user/:id` |`get` |Get a specific user by Admin | Yes |
| `/admin/user/:id` |`put` |Update user by Admin | Yes |
| `/admin/user/:id` |`delete` |Delete user by Admin | Yes |

### 4. Order routes

|Endpoint |HTTP Method | Description | Auth Required |
| --- | --- | --- | --- |
| `/order` |`post` |Create order | Yes |
| `/order/:id` |`get` |Get Single Order Detail | Yes |
| `/orders/me` |`get` |Get all orders of logged-in users | Yes |
| `/admin/orders |`get` |Get all orders by Admin | Yes |
| `/admin/order/:id` |`put` |Update & Process order by Admin | Yes |
| `/admin/order/:id` |`delete` |Delete order by Admin | Yes |


### 4. Review routes

|Endpoint |HTTP Method | Description | Auth Required |
| --- | --- | --- | --- |
| `/review` |`put` |Create new review or update existing review | Yes |
| `/reviews` |`get` |Get all reviews of a product | Yes |
| `/review` |`delete` |Delete a review of product | Yes |
