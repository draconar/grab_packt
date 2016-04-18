Grab a book a day for free from Packt Pub, https://www.packtpub.com/packt/offers/free-learning.

## 1. Install prerequisites

Install this script in the cloned directory using the following command:

    npm install


## 2. Add credentials

Copy the .env file into place with

    cp .env.example .env

Or on Windows:

    copy .env.example .env

And set your packt email and password.


## 3. Grab on recurrent basis

### Using Node
After that run the script with the following command:

    watch -n 5000 --differences node server.js

### Using Crontab
Or add it to your crontable:

    crontab -e
    
For the crontab all paths in **MUST** be absolute. 

Within the open cron editor window

    0 14 * * * /usr/local/bin/node /Users/<USER_NAME>/<PATH_TO>/grab_packt/server.js >> /tmp/cron_output


### Using Task Scheduler in Windows

Check the *run.bat* file in the repo. Correct any path if necessary according to your needs. Try running the script manually to verify that it works as expected.
	
Then add a scheduled task to execute run.bat every day by running.	

    add_scheduled_task.bat

### OSX Error
If you get the message:
`crontab: temp file must be edited in place`
	
On a related issue, if you get the message:
`crontab: temp file must be edited in place`

**Try:**  
1) Add to `.bash_profile`
```sh
alias crontab="VIM_CRONTAB=true crontab"
```
2) Add to `.vimrc`
```vi
if $VIM_CRONTAB == "true"
    set nobackup
    set nowritebackup
endif
```
*note: .bash_profile might be called .profile*  
*note: .vimrc and .bash_profile are located in the home directory: `~/`*  
*Reference: http://superuser.com/a/750528*
