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

If you are using UTC/BST timezone in your server, you might want to set the crontab as follow:

    25 0 * * * /usr/bin/nodejs /home/user/grab_packt/server.js >> /tmp/cron_output

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

### Using Launchd (OSX)
launchd is recommended over cron for the OSX system.  

This runs on load and from then on every 24 hours (86400 seconds).  
Just substitute `<username>` for your own.

*by daemon I am referring to the .plist file*

Navigate to directory:
```sh
cd $HOME/Library/LaunchAgents
```

Create file:
```sh
touch com.<username>.grab_pkt.plist
```

Edit file:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.<username>.grab_pkt</string>

  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/node</string>
    <string>/Users/<username>/development/misc/grab_packt/server.js</string>
  </array>

  <key>Nice</key>
  <integer>1</integer>

  <key>StartInterval</key>
  <integer>86400</integer>

  <key>RunAtLoad</key>
  <true/>

  <key>StandardErrorPath</key>
  <string>/tmp/GrabPkt.err</string>

  <key>StandardOutPath</key>
  <string>/tmp/GrabPkt.out</string>
</dict>
</plist>
```

Load this daemon into the system:
```sh
launchctl load com.<username>.grab_pkt.plist
```
*to unload just change load to unload*  

Check output of script:
```sh
/tmp/GrabPkt.out
```
It should be similar to:
```sh
----------- Packt Grab Started -----------
Book Title: Learning Libgdx Game Development
Claim URL: https://www.packtpub.com/freelearning-claim/13277/21478
----------- Packt Grab Done --------------
```

Check for errors:
```sh
/tmp/GrabPkt.err
```
Mine is empty due to having no errors.  

In order to test I would:
- remove the `GrabPkt.out` file
- unload daemon
- load daemon
- check output of `GrabPkt.out` file

*reference: http://alvinalexander.com/mac-os-x/mac-osx-startup-crontab-launchd-jobs*  
