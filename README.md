## Task 1 - Identify and fix the issue with getCatsInfo API

This issue was related to the setTimeout in generateToken function. What was happening was that the setTimeout was just waiting for the settimeout to finish, not for the entire function (since the function it is in in async) so I made the settimeout async. 

Also, in the refreshToken I added a delay before the token is refreshed since the other issue was that the generatetoken function would finish before a token is refreshed so the token in generatetoken would be undefined. I added a slight delay to before the token is refreshed so it will wait until the token is generated first so nothing shows up undefined.

For this task, I updated the getCatsWorker.js worker file in the refreshToken and generateToken functions.


## Task 2 - Add correlationId header to all the requests and response

We had the correlation/request id from Fastify in request.id so I went in index.js and for both routes, I set the headers to include "correlationid" as that value for requests and replys. 

This will ensure that we maintain a consistent id across asynchronous calls this is useful for example we need to log and see where an error arose since we have an id per request.

For this task I updated the headers being set in the index.js file where the get requests are taking place


## Task 3 - Terminate the idle worker and recreate when needed
In generateNewWorker.js I have the program logging when a new worker is started and when one is terminated, we could also have it logging out the data but for these purposes to see when a worker is created and destroyed I did not think that was necessary 

Also, I added a setTImeout inside of the generateNewFunction. I have it waiting 15 minutes and if there is nothing happening on the thread it then terminates the thread and logs that out. This is important since if we have more than one worker alive at once it can cause the program to lag since although we have the worker threads to off-load some processes to, javascript is still single threaded and too many requests at once will cause blocking since node is still javascript and can only do one thing at a time.#   A m e x - n o d e 
 
 