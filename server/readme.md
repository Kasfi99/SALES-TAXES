## Table :

New Table and endpoint : User, Order, Product

Users

```
 - email : string required,
 - password : string, required,
```

Products

```
- name : string, required,
- quantity : integer, required,
- price : integer, required
```

Orders

```
- USerId: integer, Required,
- ProductId: integer, Required
```

## Relationship :

> - Users dan Product = **Many-to-Many : through Orders**

## List of available endpoints:

- `POST /user/sign-up`
- `POST /user/sign-in`
- `POST /order/add-order`
- `GET /order/my-order`

## And routes below need authentication

- `POST /order/add-order`
- `GET /order/my-order`

## 1. POST /User/sign-up

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /User/sign-in

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "email": "string",
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 3. GET /order/my-order

_Response (200 - OK)_

```json
[
  {
    "UserId": 3,
    "ProductId": 7,
    "createdAt": "2023-07-08T14:04:44.140Z",
    "updatedAt": "2023-07-08T14:04:44.140Z",
    "User": {
      "email": "kasfi@mail.com"
    },
    "Product": {
      "id": 7,
      "name": "Huawei Router",
      "quantity": 5,
      "price": 100000,
      "createdAt": "2023-07-08T14:04:44.116Z",
      "updatedAt": "2023-07-08T14:04:44.116Z"
    }
  }
]
```

## 4. POST /order/add-order

request:

- body:

```json
{
  "name": "string",
  "quantity": "integer",
  "price": "integer"
}
```

_Response (201 - Created)_

```json
{
  "UserId": 3,
  "ProductId": 7,
  "createdAt": "2023-07-08T14:04:44.140Z",
  "updatedAt": "2023-07-08T14:04:44.140Z",
  "User": {
    "email": "kasfi@mail.com"
  },
  "Product": {
    "id": 7,
    "name": "Huawei Router",
    "quantity": 5,
    "price": 100000,
    "createdAt": "2023-07-08T14:04:44.116Z",
    "updatedAt": "2023-07-08T14:04:44.116Z"
  }
}
```
