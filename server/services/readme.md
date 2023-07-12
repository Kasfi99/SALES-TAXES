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
- price : float, required
- origin : string, required,
- category: String, required,
```

Orders

```
- UserId: integer, Required,
- ProductId: integer, Required
```

## Relationship :

> - Users dan Product = **Many-to-Many : through Orders**

## List of available endpoints:

- `POST /user/sign-up`
- `POST /user/sign-in`
- `POST /order/make-order`
- `GET /order/my-order`
- `GET /download`
- `GET /order/detail-order`
- `POST /order/calculate-order`
- `POST /order/confirm-order`

## And routes below need authentication

- `POST /order/make-order`
- `GET /order/my-order`
- `GET /order/detail-order`
- `POST /order/calculate-order`
- `POST /order/confirm-order`

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
    "id": 1,
    "name": "book",
    "quantity": 37,
    "price": 12.49,
    "origin": "domestic",
    "category": "Books",
    "createdAt": "2023-07-12T11:05:57.419Z",
    "updatedAt": "2023-07-12T11:05:57.419Z"
  }
]
```

## 4. POST /order/make-order

request:

- body:

```json
{
  "name": "string",
  "quantity": "integer",
  "price": "float",
  "origin": "string",
  "category": "string"
}
```

_Response (201 - Created)_

```json
"product": {
        "id": 10,
        "name": "Fairy Book",
        "quantity": 35,
        "price": 7.8,
        "origin": "domestic",
        "category": "books",
        "updatedAt": "2023-07-12T12:44:55.541Z",
        "createdAt": "2023-07-12T12:44:55.541Z"
    },
    "order": {
        "UserId": 3,
        "ProductId": 10,
        "updatedAt": "2023-07-12T12:44:55.560Z",
        "createdAt": "2023-07-12T12:44:55.560Z",
        "receiptLink": null
    }
```

## 5. POST /order/calculate-order

request:

- body:

```json
[
  {
    "name": "string",
    "price": "float",
    "quantity": "integer",
    "origin": "string",
    "category": "string"
  }
]
```

_Response (201 - Created)_

```json
{
  "productSales": [
    {
      "name": "book",
      "price": "12.50",
      "quantity": 37,
      "salesTax": "0.00",
      "productPriceAfterTax": "462.50"
    },
    {
      "name": "music CD",
      "price": "15.40",
      "quantity": 62,
      "salesTax": "1.40",
      "productPriceAfterTax": "954.80"
    },
    {
      "name": "chocolate bar",
      "price": "0.85",
      "quantity": 88,
      "salesTax": "0.00",
      "productPriceAfterTax": "74.80"
    },
    {
      "name": "imported box of chocolates",
      "price": "10.50",
      "quantity": 24,
      "salesTax": "0.50",
      "productPriceAfterTax": "252.00"
    }
  ],
  "salesTaxes": "98.80",
  "totalPrice": "1744.10"
}
```

## 6. POST /order/confirm-order

request:

- body:

```json
{
  "productSales": [
    {
      "name": "string",
      "quantity": "integer",
      "price": "float",
      "origin": "string",
      "category": "string"
    }
  ],
  "salesTaxes": "float",
  "totalPrice": "float"
}
```

_Response (201 - Created)_

```json
{
  "success": true,
  "fileName": "filePath\\server\\controllers\\pdfs\\invoice_2023-07-12_1689166222518.pdf"
}
```

## 7. GET /order/detail-order/:id

```json
{
  "UserId": 1,
  "ProductId": 1,
  "receiptLink": null,
  "createdAt": "2023-07-12T11:05:57.419Z",
  "updatedAt": "2023-07-12T11:05:57.419Z",
  "Product": {
    "id": 1,
    "name": "book",
    "quantity": 37,
    "price": 12.49,
    "origin": "domestic",
    "category": "Books",
    "createdAt": "2023-07-12T11:05:57.419Z",
    "updatedAt": "2023-07-12T11:05:57.419Z"
  }
}
```
