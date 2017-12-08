# Mobile application installation procedure

In order to run the APP on your device you need to download some dependencies.

- Node Package Manager
Download Link: (https://nodejs.org/en/)
(version 6.0 or more)
Use this link for downloading the node package manager for react native    command line interface

- Phyton 2.7 version
Download Link: (https://www.python.org/download/releases/2.7/)

- Java JDK
Download Link: (http://www.oracle.com/technetwork/java/javase/downloads/j dk8-downloads-2133151.html)
If you have already installed any of the above dependencies,then make sure that they are of newer versions.

- AndroidStudio 6.0
Download Link: (https://developer.android.com/studio/index.html)
  - Installation Process:- 
    - Use 'custom' setup for installation and click Next for installing the components.
    - click 'configure' and select SDK Manager on welcome screen. Here, go to SDK Tools and check the below checkbox "Show Package Details" and then see whether you have installed android build tools of 24, 25 version
    (if not check the checkboxes and follow installation procedure).
    - The React Native tools require some environment variables to be set up in order to build apps with native code.
    - To create a new user variable that points to the path to your Android SDK : Control Panel --> System and Security --> Change settings --> Advanced tab --> Environment Variables --> New --> new ANDROID_HOME ).
    - Your SDK will be installed at : c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk (by default) also you can give the path of your choice at the time of configuring environment variable.
    - You can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio.
    - Select "Create Virtual Device", then pick any Phone from the list and click "Next". Click "Next" then "Finish" to create your AVD. 

  - For starting SDK:
    - Give the path for the SDK on the command prompt and the run the command
      ```sh
      emulator -avd AVDNAME.
      ```

- Editor
Download Link: (https://code.visualstudio.com/download)
you can use any editor of your choice(we are using Visual Studio Code.)

- Git
Download Link: (https://git-scm.com/downloads)

- Maven
Download Link: (https://maven.apache.org/download.cgi)
Install Link: (https://maven.apache.org/install.html)



### Run
To run the application, go to the directory(containing Project) on command prompt and then run the following commands:

```sh
$npm install -g react-native-cli
``` 
(If already installed react-native cli then no need to install)

#### (open android emulator)
```sh
npm install
react-native link
react-native run-android   (for debugging purpouse)
if you want release version  read this doc
https://facebook.github.io/react-native/docs/signed-apk-android.html
``` 

UserDetails 
  username  = admin
  password = password

  username  = saketh
  password = password

  username  = sandy
  password = password


Note: The application is done using the React Native, as I started learning react recently it would be helpful for me for to gain some expirience.

After completing with React native , I also started to accomplishing the same task using JAVA,  but because of the time limit and limited resources  (low end laptop specs) could not finish it completly using java. I am sending the java project until where i have completed. I have added the java code , you can find them in AndroidStudioProjects Folder where as MyApplicationGPS represents for finding the lat and long values of the current location and MyApplicationLOC represents for pulling the city from the JSON data and showing it in the list view.

The application files include everything expect the AndroidStudioProjects Folder for the application.
