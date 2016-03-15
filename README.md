Grab a book a day for free from Packt Pub, https://www.packtpub.com/packt/offers/free-learning.

Install this script in the cloned directory using the following command:

    npm install

Copy the .env file into place with

    cp .env.example .env

And set your email and password.


## Grab on recurrent basis

### Using Node
After that run the script with the following command:

    watch -n 5000 --differences node server.js

### Using Crontab
Or add it to your crontable:

    crontab -e
    
For the crontab all paths in **MUST** be absolute. 

Within the open cron editor window

    0 14 * * * /usr/local/bin/node /Users/<USER_NAME>/<PATH_TO>/grab_packt/server.js >> /tmp/cron_output


### using Task Scheduler in Windows

Check out the runt.bat file in the repo. Correct any path if necessary. Try running the script manually to verify that it works as expected. 
	
Then add a scheduled task to execute run.bat by running.	

    add_scheduled_task.bat

