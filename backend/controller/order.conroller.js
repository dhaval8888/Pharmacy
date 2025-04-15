import medicine from "../model/medicine.model.js";
import Order from "../model/order.model.js";
import User from "../model/user.model.js";


// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { user, medicines, shippingAddress } = req.body;

    // Calculate totalAmount
    let totalAmount = 0;
    for (let item of medicines) {
      const med = await medicine.findById(item.medicine);
      if (!med) {
        return res.status(404).json({ message: `Medicine not found: ${item.medicine}` });
      }
      totalAmount += parseFloat(med.price) * item.quantity;
    }

    const order = new Order({
      user,
      medicines,
      totalAmount,
      shippingAddress,
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error while creating order" });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .populate("medicines.medicine");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("medicines.medicine");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error while fetching order" });
  }
};

// Update order status/payment
export const updateOrder = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order updated", order: updated });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error while updating order" });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error while deleting order" });
  }
};
