import React from "react";
import AccordionImage from "../assets/banner.jpg";
import Lottie from "lottie-react";
import AccordionAnimation from "../assets/AccordionAnimation.json";

const FAQSection = () => {
  return (
    <div className="max-w-screen-lg mx-auto my-24 p-4">
      <h1 className="text-4xl font-bold text-center mb-12">
        Everything you need to know about our service
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Animation Section */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={AccordionAnimation} />
        </div>

        {/* FAQ Section */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="collapse collapse-arrow bg-base-200 rounded-lg shadow-md">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What do I need to rent a car?
            </div>
            <div className="collapse-content">
              <p>
                Explore our diverse selection of high-end vehicles, choose your
                preferred pickup and return dates, and select a location that
                best fits your needs.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 rounded-lg shadow-md">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              How Old Do I Need To Be To Rent A Car?
            </div>
            <div className="collapse-content">
              <p>
                The minimum age is 21. Additional fees may apply for drivers
                under 25.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 rounded-lg shadow-md">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              Can I Rent A Car With A Debit Card?
            </div>
            <div className="collapse-content">
              <p>Yes, but additional verification might be required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
