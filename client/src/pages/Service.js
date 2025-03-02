
import React from 'react'
import { Link } from 'react-router-dom';

function ServicePage() {
  return (
    <>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-center text-secondary mb-12">
            Welcome to  Computer Shop - Services
          </h1>

          {/* Introduction Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
            <p className="text-lg text-fourth text-center leading-relaxed">
              At <span className="font-bold text-secondary underline-offset- "> Computer Shop</span>, we are dedicated to providing
              exceptional computer services for all your tech needs. From custom-built PCs to computer repairs and
              upgrades, we have you covered. Our expert team ensures that every customer receives top-notch support and
              quality products. Explore our services below!
            </p>
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Item - Custom PC Builds */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                className="w-full h-40 object-cover rounded-lg mb-6"
                src="https://images.pexels.com/photos/2582930/pexels-photo-2582930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Custom PC Build image
                alt="Custom PC Build"
              />
              <h2 className="text-2xl font-semibold text-secondary mb-4">Custom PC Builds</h2>
              <p className="text-gray-700">
                Want a custom-built PC for gaming, work, or everyday use? At , we help you choose the best components
                and build a high-performance PC tailored to your needs.
              </p>
            </div>

            {/* Service Item - Computer Repairs */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                className="w-full h-40 object-cover rounded-lg mb-6"
                src="https://images.pexels.com/photos/4705635/pexels-photo-4705635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Computer Repair image
                alt="Computer Repair"
              />
              <h2 className="text-2xl font-semibold text-secondary mb-4">Computer Repairs</h2>
              <p className="text-gray-700">
                Facing issues with your computer? Our technicians at  provide fast and reliable repair services for
                desktops, laptops, and other devices. We fix both hardware and software issues.
              </p>
            </div>

            {/* Service Item - Hardware Sales */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                className="w-full h-40 object-cover rounded-lg mb-6"
                src="https://images.pexels.com/photos/5327981/pexels-photo-5327981.jpeg?auto=compress&cs=tinysrgb&w=600" // Hardware Sales image
                alt="Hardware Sales"
              />
              <h2 className="text-2xl font-semibold text-secondary mb-4">Hardware Sales</h2>
              <p className="text-gray-700">
                At , we offer a wide range of high-quality computer components, peripherals, and accessories for
                upgrading or building your PC. Get the latest hardware at unbeatable prices.
              </p>
            </div>

            {/* Service Item - Data Recovery */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                className="w-full h-40 object-cover rounded-lg mb-6"
                src="https://images.pexels.com/photos/3970328/pexels-photo-3970328.jpeg?auto=compress&cs=tinysrgb&w=600" // Data Recovery image
                alt="Data Recovery"
              />
              <h2 className="text-2xl font-semibold text-secondary mb-4">Data Recovery</h2>
              <p className="text-gray-700">
                Lost important data? Our data recovery experts at  can help retrieve lost or corrupted data from your
                hard drives, SSDs, or other storage devices.
              </p>
            </div>

            {/* Service Item - Virus Removal */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                className="w-full h-40 object-cover rounded-lg mb-6"
                src="https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600" // Virus & Malware Removal image
                alt="Virus Removal"
              />
              <h2 className="text-2xl font-semibold text-secondary mb-4">Virus & Malware Removal</h2>
              <p className="text-gray-700">
                Is your computer infected with viruses or malware? Our team will clean your system and ensure it stays
                protected with the latest security measures.
              </p>
            </div>

            {/* Service Item - Network Setup */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                className="w-full h-40 object-cover rounded-lg mb-6"
                src="https://images.pexels.com/photos/4280696/pexels-photo-4280696.jpeg?auto=compress&cs=tinysrgb&w=600" // Network Setup image
                alt="Network Setup"
              />
              <h2 className="text-2xl font-semibold text-secondary mb-4">Home & Office Network Setup</h2>
              <p className="text-gray-700">
                Need help setting up a home or office network?  offers professional network installation and setup
                services to ensure a secure and fast connection for all your devices.
              </p>
            </div>
          </div>


          {/* Call-to-Action Section */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-secondary mb-6">Ready to Upgrade Your Tech?</h3>
            <Link to="/contact">
              <button className="btn-color">
                Contact Us Today
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServicePage



