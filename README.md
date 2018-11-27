# Installation guide
1. Clone the repo
2. Run composer install command 
3. set the proper permissions on all files 
    Run the foloowing commands
        sudo chgrp -R www-data storage bootstrap/cache
        sudo chmod -R ug+rwx storage bootstrap/cache
4. setup application environment for the project
    Run cp .env.example .env
5. Generate app. key
    Run php artisan key:generate
6. Setup .env file configurations
7. Run migrations
    php artisan migrate

8. Add virtual host and configure CORS

# Installation guide for frontend
1. Workspace directory is frontend
2. run npm install
3. setup application environment for the project
    Run cp config.example.js ./src/config.js
4. npm start (for development)
5. npm run build (for optimized build)



