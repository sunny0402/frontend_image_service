## About

node: v14.15.5
npm: 8.1.0

# Authentication:

Auth with JWTs. Access and refresh tokens.
API send and receive access tokens as JSON data.
Access token issued after sign in. API verifies access token with middleware every time request is made.
Front end store access token stored in app memory(app state), not in local storage or cookie.
Refresh token is also issued after sign in. API verifies refresh token. Reference to refresh token stored in database. Refresh tokens allowed to expire. Or deleted from databse upon logout.
Refresh token issued in HTTP only cookie. Refresh tokens have expiration and cannot refresh token cannot issue new tokens.

Generate tokens.

```
require('crypto').randomBytes(64).toString('hex');
```

# Images:

Upload images to Amazon S3 using aws-sdk and multer. Store reference to s3 adress in database.

To set up s3 need AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY,

## TODO

Your assignment is: Using NODEJS, AWS, and REACTJS with minimal packages, create and host a website with the following three pages:

Create User Page.

- Create a user with Email, Password, and Image upload.
- The image upload should only allow image file uploads (.jpg, .png, etc). Invalid file types such as .docx or .txt should be automatically blocked and generate an error message.

Sign In Page. Login with Email and Password.

Authenticated Page.

- After signing in, redirect the user to the authenticated page. Display Email and Image. The image cannot be base64.

NOTES: Do not use any UI libraries.
The website's appearance does not matter as long as the functions above work correctly. Please use minimal packages in your repo.
I must be able to view and use your website, as well as view your repo. Your ReactJS and NodeJS code must be included in the public repo link.
