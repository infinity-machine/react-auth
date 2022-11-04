const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const keySchema = new Schema({
    key: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

// TO DO - ENCRYPT KEYS AND USER IDS
// keySchema.pre('save', async function() {
//     const hashed_key = await bcrypt.hash(this.key, 10);
//     const hashed_id = await bcrypt.hash(this.email, 10);
//     this.key = hashed_key;
//     this.user_id = hashed_id;
// });
// keySchema.pre('save', async function(next) {
//     try {
//         const salt = await bcrypt.genSalt(10)
//         const hashed_key = await bcrypt.hash(this.key, salt)
//         this.key = hashed_key;
//         next()
//     } catch (err) {
//         next(err)
//     }
// });

// keySchema.methods.validateKey = async function(key_to_check) {
//     const key_is_valid = await bcrypt.compare(key_to_check, this.key);
//     return key_is_valid;
// };

// keySchema.methods.validateID = async function(id_to_check) {
//     const id_is_valid = await bcrypt.compare(id_to_check, this.user_id);
//     return id_is_valid;
// };

const Key = model('key', keySchema);

module.exports = Key;