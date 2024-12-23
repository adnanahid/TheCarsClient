import React from "react";

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
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="flex flex-wrap justify-center gap-6 px-5">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="offer-card relative w-80 bg-white rounded-lg shadow-md p-6 text-center transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {offer.title}
            </h3>
            <p className="text-gray-600 mt-2">{offer.description}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
              {offer.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
