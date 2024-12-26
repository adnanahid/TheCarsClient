import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const SpecialOffers = () => {
  const offers = [
    {
      title: "Get 15% off for weekend rentals!",
      description:
        "Book your car now and enjoy a discount on all weekend bookings.",
      buttonText: "Learn More",
    },
    {
      title: "Luxury cars at $99/day this holiday season!",
      description:
        "Experience luxury at an unbeatable price. Limited time offer.",
      buttonText: "Book Now",
    },
    {
      title: "Free fuel for the first 100 miles!",
      description:
        "Rent now and enjoy free fuel for your first 100 miles. Available on select cars.",
      buttonText: "Explore Now",
    },
    {
      title: "Early bird special: Save up to 20%!",
      description:
        "Plan ahead and book your car early to enjoy great savings. Limited availability.",
      buttonText: "Reserve Now",
    },
    {
      title: "Family package: SUVs at 10% off!",
      description:
        "Perfect for family trips! Book an SUV and get a discount this season.",
      buttonText: "Check Details",
    },
  ];

  return (
    <section className="py-10 max-w-[700px] mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Special Offers
      </h2>
      <AwesomeSlider className="h-[300px] bg-gray-50 rounded-lg shadow-lg overflow-hidden">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="offer-car rounded-lg shadow-md p-6 text-center transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {offer.title}
            </h3>
            <p className="text-gray-600 mt-2">{offer.description}</p>
            <button className="mt-4 bg-[#E51837] py-2 px-4 rounded-lg hover:bg-[#C41630] transition-colors">
              {offer.buttonText}
            </button>
          </div>
        ))}
      </AwesomeSlider>
    </section>
  );
};

export default SpecialOffers;
