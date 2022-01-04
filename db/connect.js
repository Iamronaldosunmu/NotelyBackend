const mongoose = require('mongoose');

module.exports = (app, port, connectionString) => {
    try {
        mongoose.connect(connectionString);
        app.listen(port, () => console.log(`Connected to the DB \n Now listening on port ${port}`));
    }
    catch (error) {
        console.log(error);
    }
}