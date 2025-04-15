import mongoose from 'mongoose';

// Define Cart Schema
const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Referencing User model
        required: true,
        ref: 'User',
    },
    medicine_id: {
        type: mongoose.Schema.Types.ObjectId, // Referencing Medicine model
        required: true,
        ref: 'medicine',
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Create Cart Model
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
