import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const { offerId } = useParams();
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");
  const [reviews, setReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (offerId) {
      fetchReviews();
    }
  }, [offerId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/rating/offer/${offerId}`
      );
      setReviews(res.data.data);
    } catch (err) {
      console.log("Failed to fetch reviews", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("users"));
    const userId = user?._id;
    console.log("userId from localStorage:", userId);

    console.log("Offer ID:", offerId);

    console.log("Submitting review with data:", { offerId, comments, rating });

    try {
      await axios.post("http://localhost:5000/rating", {
        userId,
        offerId,
        comments,
        rating,
      });
      setComments(""); // Clear the comment input
      setRating(5); // Reset rating
      fetchReviews(); // Refresh list of reviews

      alert("Review submitted successfully!");
      setSuccessMessage("Review submitted successfully!"); // Show success message
    } catch (err) {
      console.log("Failed to submit review", err);
      setSuccessMessage(""); // Reset on failure
      alert("Failed to submit review. Please try again."); // Optional error alert
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Reviews for Offer</h3>

      {/* Display Success Message */}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {/* Submit Review */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Rating (1-5):</label>
          <input
            type="number"
            className="form-control"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Comment:</label>
          <textarea
            className="form-control"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Reviews;
