import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String
    },
    rol: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

userSchema.methods.generedPasswordHash = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
}

export default model('users', userSchema);