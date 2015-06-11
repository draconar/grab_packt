Grab a book a day for free from Packt Pub, https://www.packtpub.com/packt/offers/free-learning.

Install this script in the cloned directory using the following command:

    npm install

Copy the .env file into place with

    cp .env.example .env

And set your email and password.

After that run the script with the following command:

    watch -n 5000 --differences node server.js

Or add it to your crontable:

    crontab -e

**Don't forget to change your user/pass in the server.js file**
