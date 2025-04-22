import React, { useEffect, useState } from "react"
import axios from "axios"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [userId, setUserId] = useState("") // Ideally fetched from auth context or cookie

  useEffect(() => {
    // Dummy user_id – replace with real one in actual use

    const fetchCart = async (req,res) => {
      try {
        const res = await axios.get(`http://localhost:4004/cart/fetch`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },

        })
        console.log(res.data.cart);
        setCartItems(res.data.cart)
      } catch (err) {
        console.error("Failed to fetch cart items", err)
      }
    }

    fetchCart()
  }, [])

  const handleRemove = async (cartId) => {
    try {
      await axios.delete(`http://localhost:4004/cart/remove/${cartId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      // console.log(cartId)
      setCartItems((prev) => prev.filter((item) => item.cart_id !== cartId))
    } catch (err) {
      console.error("Failed to remove item", err)
    }
  }

  const totalPrice = Array.isArray(cartItems)
  ? cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    )
  : 0;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
    {/* Cart Items */}
    <div className="md:col-span-2 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Shopping Cart</h2>

      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.medicine_id?.image || "https://img.pikbest.com/png-images/qianku/pills-red-white-simple-medical-hospital-medicine_2199872.png!w700wp"}
                alt={item.medicine_id?.name || "Medicine"}
                className="w-20 h-20 object-cover rounded-md border"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.medicine_id?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Price: ₹{item.price}
                </p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-blue-600">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemove(item.cart_id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
    </div>

    {/* Cart Summary */}
    <div className="bg-white rounded-xl shadow-md p-6 h-fit">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
      <div className="flex justify-between text-gray-700 mb-2">
        <span>Total Items:</span>
        <span>{cartItems.length}</span>
      </div>
      <div className="flex justify-between text-gray-700 font-semibold text-lg">
        <span>Total Price:</span>
        <span>₹{totalPrice.toFixed(2)}</span>
      </div>
      <button
        disabled={cartItems.length === 0}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
      >
        buy now
      </button>
    </div>
  </div>
</div>

  )
}
