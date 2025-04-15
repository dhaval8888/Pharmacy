import React, { useEffect, useState } from "react"
import axios from "axios"

export default function MyOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:4004/order/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        setOrders(res.data)
      } catch (err) {
        console.error("Failed to fetch orders", err)
      }
    }

    fetchOrders()
  }, [])

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:4004/order/delete/${orderId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })

      // Remove canceled order from state
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId))
    } catch (err) {
      console.error("Failed to cancel order", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Order ID: <span className="text-gray-600">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Status: <span className="font-medium">{order.status}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment: <span className="font-medium">{order.paymentStatus}</span>
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                {order.medicines.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-800 font-medium">{item.medicine.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-gray-800 font-semibold">
                      ₹{item.medicine.price} x {item.quantity}
                    </p>
                  </div>
                ))}

                <div className="text-right mt-4">
                  <p className="text-lg font-bold text-blue-600">Total: ₹{order.totalAmount}</p>
                </div>

                <div className="mt-6 border-t pt-4 text-sm text-gray-500">
                  <p><strong>Shipping Address:</strong></p>
                  <p>{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                </div>

                {/* Cancel Order Button */}
                <div className="mt-6 text-right">
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
