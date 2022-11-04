const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(this.password, salt);
    this.password = hashed_pass;
});

userSchema.methods.validatePass = async function(pass_to_check) {
    const pass_is_valid = await bcrypt.compare(pass_to_check, this.password);
    return pass_is_valid;
};

const User = model('User', userSchema);

module.exports = User;