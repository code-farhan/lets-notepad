# come_write
Simple multi-user real-time collaborative text editor.

Q1) Provide an overview of how to build and run your app.

Test Deployed version :- 

Deployed link - http://65.0.21.137:3000/

How to test ? - Open link on two different devices and type on the devices simultaneously to test.

Test Local Setup :- 

1) Run Server (Server runs on port 3001)

      i) cd server

      ii) npm install

      iii) npm start

Open a new terminal window

2) Run Client (Client runs on port 3000)

      i) cd client

      ii) npm install --force

      iii) npm start

3) Open localhost:3000 on your browser to launch the app

4) Open one more browser window and again open localhost:3000

5) Type in one of the browsers and it will replicate inside another.

Q2) A brief explanation of your architecture and system design.

Its a simple implementation where I have used Socket.io for collaboration on the server side of the app and have emitted respective events from the React app on text change.

System Design - FE and BE runs on two different ports and are hosted on a Amazon EC2 machine. I have used PM2 so that the scripts keep running in the background.

Q3) A brief explanation of how conflict resolution is handled. You may comment on the tradeoffs of your strategy and any areas where it can be improved.

I have used Quill text editor with React that basically stores the delta of the document on any text change so it just stores a subset of the document and not the complete document on any change. So whenever a change is there then instead of the whole document getting overwritten, we get commands like insert ot delete from quill and only that change is made. This enables good user experience when collaborating. 

I think the only tradeoff with this strategy is the use of 3rd party dependency but its not that big of a problem and the pros really outweigh the cons. Quill is open source and is actively maintained, has a lot of cool features to support rich text formatting, trusted by big companies like slack, linkedin etc.

Q4) Are there any cool technology/libraries/algorithms you want to explore further related to this app if you had the time? Are there any burning questions you have about the technology? (This part is optional)

I really wanted to add a very useful and cool feature of google docs to my app. The feature is multiple coloured cursors for different users, but for that I need to write a set of apis and also establish a db connection to keep track of multiple documents and multiple users on the same document. I even implemented a part of it on my local system but halfway into this realized the above dependencies.
