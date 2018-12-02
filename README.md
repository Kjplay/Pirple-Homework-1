# Homework assigment#1
## 1. Port and config
* Runs a HTTP server on 2000 port and HTTPS server on 2001 port by default. (staging environment)
* Ports in "production" environment: 4000 for HTTP and 4001 for HTTPS.
* If route doesn't have a handler it will return an empty obejct with 404 status.
## 2."/hello" route
1. Returns a "Hi" message as a JSON.
2. You can provide your name in queryString as "name" (ex. "?name="Joe").
## 3. "/riddle" route
1. Returns a riddle in JSON format.
2. You can provide answer in queryString as "answer" (ex. "?answer=foo").
3. If you answer correctly, it will return a message.
## 4. "/tonguetwister" route
1. Returns a random Polish tongue twister in JSON format.
2. You can choose a one by the queryString (ex. "?number=1")
3. If your number will be too high or too low it will return a random tongue twister.
### Thank you!
