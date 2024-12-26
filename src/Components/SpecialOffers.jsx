import React from "react";
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
    <section className="py-10 max-w-[1080px] mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Special Offers
      </h2>
      <swiper-container
        class="mySwiper"
        pagination="true"
        pagination-clickable="true"
        space-between="30"
        slides-per-view="4"
      >
        {offers.map((offer, index) => (
          <swiper-slide key={index}>
            <div className="transition-transform transform hover:scale-105 hover:shadow-lg card flex flex-col rounded-lg shadow-md p-6 text-center h-96">
              <h3 className="text-xl font-semibold text-gray-800 pt-12">
                {offer.title}
              </h3>
              <p className="text-gray-600 mt-2 flex-grow pt-12">
                {offer.description}
              </p>
              <button className="mt-4 bg-[#E51837] py-2 px-4 rounded-lg hover:bg-[#C41630] transition-colors text-white">
                {offer.buttonText}
              </button>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </section>
  );
};

export default SpecialOffers;
