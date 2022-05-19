const mongoose = require('mongoose');

const dbName = "PetsDB"

mongoose.connect(`mongodb+srv://root:19f2febs@cluster0.2ma7z.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(error => console.log('Failed To Connect', error));