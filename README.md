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
    
For the crontab all paths in **MUST** be absolute. 
Within the open cron editor window

    0 14 * * * /usr/local/bin/node /Users/<USER_NAME>/<PATH_TO>/grab_packt/server.js >> /tmp/cron_output
	
If you are using Windows, create a run.bat file similar to the following:

	"C:\Program Files\nodejs\node.exe" "C:\Users\<USER_NAME>\Documents\GitHub\grab_packt\server.js" >> "C:\Users\<USER_NAME>\Documents\GitHub\grab_packt\output.txt"
	
Then add a scheduled task to execute run.bat daily at noon.	

	schtasks.exe /Create /SC DAILY /TN "Grab Packt Books" /TR "C:\Users\<USER_NAME>\Documents\GitHub\grab_packt\run.bat" /ST 12:00

_Make sure you have a output file to write to_