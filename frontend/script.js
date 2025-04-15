// Firebase configuration
// Replace with your actual Firebase project config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "webdevai-real.firebaseapp.com", 
    databaseURL: "https://webdevai-real-default-rtdb.firebaseio.com",
    projectId: "webdevai-real",
    storageBucket: "webdevai-real.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// DOM elements
const dataForm = document.getElementById('data-form');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const dataContainer = document.getElementById('data-container');

// Add event listener for form submission
dataForm.addEventListener('submit', e => {
    e.preventDefault();
    
    // Get input values
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    
    if (name && message) {
        // Save data to Firebase
        saveData(name, message);
        
        // Clear form
        nameInput.value = '';
        messageInput.value = '';
    }
});

// Save data to Firebase
function saveData(name, message) {
    // Generate a unique key for new data
    const newDataKey = database.ref().child('messages').push().key;
    
    // Create data object
    const dataObject = {
        name: name,
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    
    // Write the new data
    database.ref('messages/' + newDataKey).set(dataObject)
        .then(() => {
            console.log('Data saved successfully!');
        })
        .catch(error => {
            console.error('Error saving data: ', error);
        });
}

// Listen for changes in the database
function loadData() {
    // Get all messages ordered by timestamp
    database.ref('messages').orderByChild('timestamp').on('value', snapshot => {
        // Clear the data container
        dataContainer.innerHTML = '';
        
        // Check if data exists
        if (snapshot.exists()) {
            // Create an array from the data to reverse it (newest first)
            const data = [];
            snapshot.forEach(childSnapshot => {
                data.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            // Reverse the array to show newest messages first
            data.reverse();
            
            // Render each message
            data.forEach(item => {
                const dataItem = document.createElement('div');
                dataItem.className = 'data-item';
                
                // Format the timestamp
                const date = new Date(item.timestamp);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                
                dataItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.message}</p>
                    <small>${formattedDate}</small>
                `;
                
                dataContainer.appendChild(dataItem);
            });
        } else {
            // If no data exists
            dataContainer.innerHTML = '<p class="placeholder">No data available</p>';
        }
    }, error => {
        console.error('Error loading data: ', error);
        dataContainer.innerHTML = '<p class="placeholder">Error loading data</p>';
    });
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', loadData); 