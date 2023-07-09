# test-news-crud
Test task to create CRUD app for news service

To run localy requires a local PostgreSQL server

1. Create .env file based on .env-example, put your postgres info and an unused db name
2. "npm run first-start" for first time launch "npm run start" for everything after

Authentication: 1. POST http://localhost:${PORT}/auth/register with email and password in body to create a user
              2. Login at POST http://localhost:${PORT}/auth/login with email and password int he body
              3. GET http://localhost:${PORT}/auth/refresh to use refresh token
              4. GET http://localhost:${PORT}/auth/ to use access token
              5. Logout at POST http://localhost:${PORT}/auth/logout

Create posts: POST http://localhost:${PORT}/posts with title and content of a news post in body to create a a new one

Get posts: GET http://localhost:${PORT}/posts to view all posts, optional query params "size" and "page" for pagination
           GET http://localhost:${PORT}/posts/${id} to view posts by id

Edit posts: PUT http://localhost:${PORT}/posts/${id} with title and content in body

Delete posts: DELETE http://localhost:${PORT}/posts/${id} 
          