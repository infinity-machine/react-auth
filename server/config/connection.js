const mongoose = require('mongoose');
const URL = process.env.ATLAS_CONNECT_URL ? process.env.ATLAS_CONNECT_URL : 'mongodb://localhost:27017/react-auth';

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) console.log(err)
  else console.log('DB CONNECTED GOOD JOB FIVE STAR')
});

// Export connection
module.exports = mongoose.connection;