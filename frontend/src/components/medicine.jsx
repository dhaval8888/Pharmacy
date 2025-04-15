import React, { useEffect, useState } from "react"
import axios from "axios"

export default function MedicinePage() {
  const [medicines, setMedicines] = useState([])
  const [selectedMedicine, setSelectedMedicine] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: ""
  })

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get("http://localhost:4004/medicine/fetch",{
            withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        setMedicines(res.data.allMedi || [])
      } catch (err) {
        console.error("Error fetching medicines", err)
      }
    }

    fetchMedicines()
  }, [])

  const handleBuyNow = (medicine) => {
    setSelectedMedicine(medicine)
  }

  const handleOrderSubmit = async () => {
    try {
      const totalAmount = Number(selectedMedicine.price) * quantity
      const res= await axios.post("http://localhost:4004/order/create", {
        // user: User._id,
        medicines: [
          {
            medicine: selectedMedicine._id,
            quantity: quantity
          }
        ],
        totalAmount,
        shippingAddress: formData
      },{
        withCredentials:true, 
      })
      console.log(res.data)
      alert("Order placed successfully")
    //   setSelectedMedicine()
    } catch (err) {
      console.error("Order failed", err)
    }
  }

  const handleAddToCart = async (medicineId) => {
    try {
      await axios.post("http://localhost:4004/cart/add", {
        user_id: "replace-with-user-id",
        medicine_id: medicineId,
        quantity: 1
      })
      alert("Added to cart")
    } catch (err) {
      console.error("Add to cart failed", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Medicines</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((med) => (
          <div key={med._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={med.image || "/default-medicine.jpg"} alt={med.name} className="w-full h-52 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-1">{med.name}</h2>
              <p className="text-sm text-gray-600 mb-1"><strong>Category:</strong> {med.category}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Description:</strong> {med.description}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Price:</strong> ₹{med.price}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Stock:</strong> {med.stock}</p>
              <div className="flex justify-between mt-4">
                <button onClick={() => handleBuyNow(med)} className="bg-blue-500 text-white px-3 py-1 rounded">Buy Now</button>
                <button onClick={() => handleAddToCart(med._id)} className="bg-green-500 text-white px-3 py-1 rounded">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buy Now Modal */}
{/* Buy Now Section */}
{selectedMedicine && (
  <div className="w-full bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 shadow-xl max-h-[90vh] overflow-y-auto">
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Buy: <span className="text-blue-600">{selectedMedicine.name}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
          />
        </div>

        {Object.entries(formData).map(([key, val]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              placeholder={`Enter ${key}`}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={val}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6 space-x-3">
        <button
          onClick={() => setSelectedMedicine(null)}
          className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleOrderSubmit}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Confirm & Buy
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  )
}
