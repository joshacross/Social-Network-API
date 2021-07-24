// create a variable to store conencted database object when connection is complete
let db;

// request variable to act as an event listener - event listener is created
// when we open the connection to the database using the indexedDB.open() method - post_hunt is the name, and it's version 1
const request = indexedDB.open('post_hunt', 1);

// event listener will emit if the database version changes (nonexistant to v1, v1 to v2, etc...)
request.onupgradeneeded = function(event) {
    //save a reference to the database
    const db = event.target.result;
    // 1.) create an object store (table) called `new_post`
    // 2.) set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_post', { autoIncrement: true });
};

// after successful
request.onsuccess = function(event) {
    // when db is successfully created with its object store
    //(from onupgradedneeded event above or simply established a connection), 
    // save reference to the db in global variable
    db = event.target.result;

    // check if app is online
    // if yes => run uploadpost() to send all local db data to api
    if (naviagator.online) {
        uploadPost();
    }
};

request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

/* NOTES ^:
onsuccess is setup so that when we finalize the ocnnection to the database,
we can store the resulting database object to the global variable db we created earlier
This event will also emit everytime we interact = check to see if the app is connected to internet
if it is, then we execute uploadost function.

Plus - onerror event handler if anything goes wrong with the database interaction

*/

// run function if user attempts to submit a new ost and there's not internet
// runs if the fetch() function's .catch() method is executed
function saveRecord(record) {
    // new transaction to db with read/write permission
    const transaction = db.transaction(['new_post'], 'readwrite');

    // access the object store for new_post
    const postObjectStore = transaction.objectStore('new_post');

    //add record to your store with add method
    postObjectStore.add(record);
}

/* NOTES ^: 
IndexedDB opens a transaction or temp connection to maintain an accurate reading
of the data it stores so that data is not in flux all the time.

Transaction is open - we access new_Post object store, because that is where we'll be adding data

.add() method to insert data into the new_Post object store*/

function uploadPost() {
    // open a transaction on your db
    const transaction = db.transaction(['new_post'], 'readwrite');

    // access your object store
    const postObjectStore = transaction.objectStore('new_post');

    // get all records from store and set to a variable
    const getAll = postObjectStore.getAll();

    getAll.onsuccess = function() {
        // if there was data in indexedDb's store, let's send it to the api server
        if (getAll.result.length > 0) {
            fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.message) {
                    throw new Error(serverResponse);
                }
                // open one more transaction
                const transaction = db.transaction(['new_post'], 'readwrite');

                // access the new_post object store
                const postObjectStore = transaction.objectStore('new_post');

                // clear all items in your store
                postObjectStore.clear();

                alert('All saved post has been submitted!');
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
}

/* Notes (uploadpost):
open a new transaction to the database to read the data
then we access and execute the getall method (requires event handler)

getAll.onsuccess will execute after .getAll() method completes successfully.

.result property's array of data that we received is sent to the server at /api/posts

Then we empty object store data once all data is in the database*/

// listen for app coming back online
window.addEventListener('online', uploadPost);