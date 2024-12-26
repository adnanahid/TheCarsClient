import React from "react";
import { FaCar, FaDollarSign, FaRegSmile, FaHeadset } from "react-icons/fa"; // Icons from react-icons

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCar className="text-red-600 text-4xl" />,
      title: "Wide Variety of Cars",
      description:
        "From budget-friendly options to luxury vehicles, we have something for everyone.",
    },
    {
      icon: <FaDollarSign className="text-red-600 text-4xl" />,
      title: "Affordable Prices",
      description: "Enjoy competitive daily rates that suit your budget.",
    },
    {
      icon: <FaRegSmile className="text-red-600 text-4xl" />,
      title: "Easy Booking Process",
      description: "Seamlessly book your ride in just a few clicks.",
    },
    {
      icon: <FaHeadset className="text-red-600 text-4xl" />,
      title: "Customer Support",
      description: "24/7 assistance for all your queries and concerns.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
