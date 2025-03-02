import React from 'react';
import Footer from '../components/Footer';
import ProfileImage from '../assest/Profile/ProfileImage.png'

function AboutPage({}) {
  return (
    <>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 min-w-[50px] w-full">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-center text-secondary mb-12">About Dreamy Dairy Delights</h1>

          {/* Introduction Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At <span className="font-bold text-secondary"> Dreamy Dairy Delights</span>, our mission is to sprinkle a little magic into your life by offering the creamiest, most delightful dairy products. Whether you’re dreaming of a silky smooth ice cream sundae or the perfect block of aged cheddar, we bring you dairy that’s as dreamy as a cloud on a summer day.
            </p>
          </div>

          {/* Values Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Our Values</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><span className="font-bold">Customer Joy:</span> We believe that the true magic of dairy lies in the joy it brings to your taste buds. We go above and beyond to make sure you’re always smiling with every bite.</li>
              <li><span className="font-bold">Purity & Quality:</span> From farm-fresh milk to rich cream, we ensure that every product we create is packed with the highest quality ingredients, all handpicked for their richness and flavor.</li>
              <li><span className="font-bold">Passionate Craftsmanship:</span> Our team consists of passionate artisans who are dedicated to crafting the finest dairy delights. Their expertise makes every product a true masterpiece.</li>
              <li><span className="font-bold">Innovation:</span> We’re always dreaming up new ways to infuse joy and surprise into your dairy experience, offering the latest and greatest in flavor combinations and textures.</li>
            </ul>
          </div>

          {/* Services Overview */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-secondary mb-4">What We Offer</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Dreamy Dairy Delights offers a wide range of creamy creations to fill your days with sweetness and whimsy:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><span className="font-bold">Signature Ice Creams:</span> A scoop of pure joy, from classic flavors to imaginative creations, each bite is a trip to dairy heaven.</li>
              <li><span className="font-bold">Cheeses to Melt Your Heart:</span> From smooth Brie to sharp Cheddar, our selection of cheeses is as dreamy as they come.</li>
              <li><span className="font-bold">Whipped Cream & Butters:</span> Light and airy, our whipped creams and butters elevate every dish to ethereal heights.</li>
              <li><span className="font-bold">Specialty Dairy Gifts:</span> Looking for a gift that will leave a lasting impression? Our curated baskets of creamy delights make for the perfect treat.</li>
            </ul>
          </div>

          {/* Team Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Meet the Dream Makers</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Behind every dreamy dairy creation is our passionate team of artisans, each one dedicated to crafting the perfect balance of flavor, texture, and love. With hearts full of passion for the craft, we’re here to bring you the finest dairy delights.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="flex flex-col items-center">
                <img src={ProfileImage} alt="Team Member 1" className="w-32 h-32 rounded-full mb-4" />
                <h3 className="text-lg font-semibold text-secondary">Anand Maurya</h3>
                <p className="text-gray-600">Founder & Dreamer</p>
              </div>
              {/* Team Member 2 */}
              <div className="flex flex-col items-center">
                <img src={ProfileImage} alt="Team Member 2" className="w-32 h-32 rounded-full mb-4" />
                <h3 className="text-lg font-semibold text-secondary">Knox</h3>
                <p className="text-gray-600">Lead Dairy Artisan</p>
              </div>
              {/* Team Member 3 */}
              <div className="flex flex-col items-center">
                <img src={ProfileImage} alt="Team Member 3" className="w-32 h-32 rounded-full mb-4" />
                <h3 className="text-lg font-semibold text-secondary">Anand</h3>
                <p className="text-gray-600">Customer Happiness Specialist</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-secondary p-8 rounded-lg shadow-lg text-third text-center">
            <h2 className="text-2xl font-semibold mb-4">Join the Dairy Dream</h2>
            <p className="text-lg leading-relaxed mb-6">
              Whether you're craving a dreamy scoop of ice cream or discovering a new cheese to love, Dreamy Dairy Delights is the place where magic and flavor come together. Visit us today and let us share our dream with you.
            </p>
            <a href="/contact" className="bg-primary font-semibold text-secondary px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300">
              Reach Out & Taste the Dream
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
