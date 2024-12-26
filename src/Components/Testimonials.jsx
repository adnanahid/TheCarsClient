import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const { user } = useContext(AuthContext);
  const [userComments, setUserComments] = useState([]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_DEFAULT_URL}/get-comments`,
        { withCredentials: true }
      );
      setUserComments(data);
    } catch (error) {
      toast.error("Error fetching comments.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const rating = e.target.rating.value;
    const commentsInfo = {
      name: user?.displayName,
      photo: user?.photoURL,
      rating,
      comment,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_DEFAULT_URL}/add-comment`,
        commentsInfo
      );
      toast.success("Comment posted successfully!");
      fetchComments();
      e.target.reset();
    } catch {
      toast.error("An error occurred while posting the comment.");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mt-8 text-center">
        What our customers are
        <br /> saying about us
      </h1>

      {/* Testimonials Slider */}
      <div className="max-w-[1080px] h-[350px] my-12 mx-auto">
        <swiper-container
          class="mySwiper"
          pagination="true"
          pagination-clickable="true"
          space-between="30"
          slides-per-view="3"
        >
          {userComments.map((comment, index) => (
            <swiper-slide
              key={index}
              className="flex flex-col items-center justify-center h-full bg-white px-6 py-8 "
            >
              <Rating
                placeholderRating={comment.rating}
                emptySymbol={<FaRegStar className="text-yellow-500 text-xl" />}
                placeholderSymbol={
                  <FaStar className="text-yellow-500 text-xl" />
                }
                fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
                readonly
              />
              <p className="text-gray-600 text-sm mt-3 w-10/12 mx-auto">
                {comment.comment}
              </p>
              <div className="flex flex-col items-center mt-6">
                <img
                  src={comment.photo}
                  alt={`${comment.name}'s avatar`}
                  className="w-16 h-16 rounded-full shadow-md mb-3"
                />
                <p className="font-semibold text-gray-800">{comment.name}</p>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>

      {/* Comment Submission Form */}
      {/* <div>
        <form
          onSubmit={handleComment}
          className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">
            Post Your Comment
          </h2>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-gray-700 font-medium mb-2"
            >
              Your Comment
            </label>
            <textarea
              name="comment"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E51837]"
              placeholder="Write your comment"
              rows="2"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-gray-700 font-medium mb-2"
            >
              Rating (1-5)
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E51837]"
              placeholder="Give your rating"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-[#E51837] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition ${
              !user && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!user}
          >
            {user ? "Submit" : "Login to Submit"}
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default Testimonials;
