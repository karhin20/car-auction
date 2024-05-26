const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {  
        type: String,
        required: true,
        default: 'user',  
        enum: ['user', 'admin']  
    }
}, {
    timestamps: true 
});

// ============= Password Hashing Middleware =============
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    } else {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
});

// ============= Password Verifying Function =============
userSchema.methods.matchPassword = async function (userProvidedPassword) {
    return await bcrypt.compare(userProvidedPassword, this.password);
};

const users = mongoose.model('users', userSchema);
module.exports = users;