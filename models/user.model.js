import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    passcode: {
        type: String,
        required: true,
    }
}, { timestamps: true });

userSchema.statics.signup = async function (username, passcode) {
    let errors = {};

    if (!username || username.trim() === '') {
        errors.username = 'Username is required';
    }

    if (!passcode || passcode.trim() === '') {
        errors.passcode = 'Passcode is required';
    } else if (passcode.length !== 4) {
        errors.passcode = 'Passcode must be 4 characters long';
    }

    const existingUser = await this.findOne({ username });

    if (existingUser) {
        errors.username = 'Username is already taken';
    }

    if (Object.keys(errors).length > 0) {
        throw new Error(JSON.stringify(errors));
    } else {
        const hashedPasscode = await bcrypt.hash(passcode, 10);
        const user = await this.create({ username, passcode: hashedPasscode });

        return user;
    }
}

const User = mongoose.model('User', userSchema);

export default User;