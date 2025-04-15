import React, { useEffect, useState } from "react"
import axios from "axios"

export default function DoctorPage() {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get("http://localhost:4004/doctor/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        setDoctors(response.data.allDoc)
      } catch (error) {
        console.error("Failed to fetch doctors", error)
      }
    }
    fetchDoctor()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Our Doctors
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.03] hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="w-full h-52 overflow-hidden">
              <img
                src={doctor.profileImage || "/default-doctor.jpg"}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                {doctor.name}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Specialization:</strong> {doctor.specialization}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Experience:</strong> {doctor.experience} years
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${doctor.contactEmail}`} className="text-blue-600 underline">
                  {doctor.contactEmail}
                </a>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Phone:</strong> {doctor.contactPhone}
              </p>
              <div className="mt-3">
                <strong className="text-sm text-gray-700">Available:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {doctor.availability.map((day, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
