# store
1. Go to the server folder , create a .env file and add the following fields:
   
        -> MONGO_PASSWORD  
        -> MONGO_CONNECTION_URI
        -> PORT
        -> CLOUDINARY_CLOUD_NAME
        -> CLOUDINARY_API_KEY
        -> CLOUDINARY_API_SECRET
        -> STRIPE_SECRET
           Run npm start
2. Go to the graphql folder , create a .env file and add the following fields:

        -> REST_API_BASEURL
           Run npm start
3. Go to the client folder , creat a .env.local file and add the following fields:

        -> NEXT_PUBLIC_EMAIL_VERIFICATION_REDIRECT_URL
        -> NEXT_PUBLIC_FORGOT_PASSWORD_REDIRECT_URL
        -> NEXT_PUBLIC_API_URL
        -> NEXT_PUBLIC_GRAPHQL_URL
        -> NEXT_PUBLIC_STRIPE_KEY
           Run npm run dev
 
