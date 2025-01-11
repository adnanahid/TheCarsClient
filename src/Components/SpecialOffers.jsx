import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


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
    <section className="py-10 max-w-screen-xl mx-auto px-4 mt-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Special Offers
      </h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {offers.map((offer, index) => (
          <SwiperSlide key={index}>
            <div className="card flex flex-col rounded-lg p-6 bg-white text-center h-72 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-800 pt-8">
                {offer.title}
              </h3>
              <p className="text-gray-600 mt-4 flex-grow">
                {offer.description}
              </p>
              <button className="mt-6 bg-[#E51837] py-2 px-4 rounded-lg hover:bg-[#C41630] transition-colors text-white ">
                {offer.buttonText}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SpecialOffers;
