import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import Rating from "react-rating";
import { FaRegStar } from "react-icons/fa";

<FaStar />;
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const { user } = useContext(AuthContext);
  const [userComments, setUserComments] = useState([]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/get-comments`);
      setUserComments(data);
    } catch (error) {
      toast.error("Error fetching cars.");
    }
  };
  useEffect(() => {
    fetchComments();
  }, [user?.email]);

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
      const { data } = await axios.post(
        "http://localhost:5000/add-comment",
        commentsInfo
      );
      toast.success("comment Posted");
      fetchComments();
      e.target.reset();
    } catch {
      toast.error("error happened");
    }
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">User Testimonials</h1>
      <div className=" max-w-screen-lg h-[350px] my-12 mx-auto">
        <AutoplaySlider
          className="h-[200px] md:h-[300px] lg:h-[300px]"
          play={true}
          cancelOnInteraction={false}
          interval={3000}
        >
          {userComments.map((comment, index) => (
            <div
              key={index}
              className="py-2 h-[300px] w-full text-center  bg-white"
            >
              <img
                src={`${comment.photo}`}
                alt=""
                className="mx-auto w-20 rounded-full"
              />
              <p className="font-semibold">{comment.name}</p>
              <p className="w-8/12 mx-auto">{comment.comment}</p>
              <Rating
                placeholderRating={comment.rating}
                emptySymbol={<FaRegStar />}
                placeholderSymbol={<FaStar />}
                fullSymbol={<FaStar />}
              />
            </div>
          ))}
        </AutoplaySlider>
      </div>

      <div>
        {/* Comment Form */}
        <form
          onSubmit={handleComment}
          className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Post your Comment
          </h2>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-gray-700 font-medium mb-2"
            >
              Your Comment
            </label>
            <textarea
              type="text"
              name="comment"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your comment"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-gray-700 font-medium mb-2"
            >
              Rating
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="give your Rating"
              required
            ></input>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            disabled={!user}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;
