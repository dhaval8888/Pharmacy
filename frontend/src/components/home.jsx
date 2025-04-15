import React from "react"
import medipolis from "../assets/medipolis.png"

export default function Home() {
  return (
    <section className="h-screen overflow-hidden flex items-center justify-center bg-[#f8f5f5] px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* Left Text Content */}
        <div className="text-center md:text-left">
          <h3 className="text-gray-600 text-lg font-medium mb-2">
            We Are Here For Your Care
          </h3>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We Are The Best Pharmacy
          </h1>
          <p className="text-gray-600 text-base mb-6">
            We are here for your care 24/7. Any help just call us.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={medipolis}
            alt="Pharmacy Illustration"
            className="w-full max-w-2xl object-contain"
          />
        </div>
      </div>
    </section>
  )
}
