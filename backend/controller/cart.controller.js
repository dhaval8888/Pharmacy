import Cart from "../model/cart.model.js";
import Medicine from "../model/medicine.model.js";
import User from "../model/user.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { user_id, medicine_id, quantity } = req.body;

    const user = await User.findById(user_id);
    const medicine = await Medicine.findById(medicine_id);

    if (!user || !medicine) {
      return res.status(404).json({ message: "User or Medicine not found" });
    }   

    let cartItem = await Cart.findOne({ user_id, medicine_id });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ user_id, medicine_id, quantity });
    }

    res.status(200).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error while adding to cart" });
  }
};

// Get all cart items for a user
export const getUserCart = async (req, res) => {
  try {

    const { user_id } = req.params;

    const cartItems = await Cart.find({ user_id }).populate("medicine_id");

    if (!cartItems.length) {
      return res.status(200).json({ message: "Cart is empty", cart: [] });
    }

    const formattedCart = cartItems.map((item) => ({
      cart_id: item._id,
      medicine_id: item.medicine_id._id,
      medicine_name: item.medicine_id.name,
      price: item.medicine_id.price,
      quantity: item.quantity,
      total_price: item.quantity * item.medicine_id.price,
    }));

    res.status(200).json({ cart: formattedCart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error while fetching cart" });
  }
};

// Update quantity of cart item
export const updateCartItem = async (req, res) => {
  try {
    const { cart_id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findById(cart_id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: "Cart item updated", cartItem });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Server error while updating cart item" });
  }
};

// Remove single item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { cart_id } = req.params;

    const deleted = await Cart.findByIdAndDelete(cart_id);

    if (!deleted) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Server error while removing item" });
  }
};

// Clear entire cart of a user
export const clearUserCart = async (req, res) => {
  try {
    const { user_id } = req.params;

    await Cart.deleteMany({ user_id });

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Server error while clearing cart" });
  }
};
