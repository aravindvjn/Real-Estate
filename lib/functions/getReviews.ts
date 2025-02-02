"use server";

import { query } from "../db";

export const getReviews = async () => {
  try {
    const randomReviewQuery = `
      SELECT 
        u.first_name,
        u.last_name,
        r.rating, 
        r.review_text, 
        r.created_at,
        u.profile_picture_url 
      FROM reviews r
      JOIN users u ON r.user_id = u.user_id
      ORDER BY RANDOM() 
      LIMIT 5;
    `;

    const averageRatingQuery = `
      SELECT ROUND(AVG(rating), 1) AS average_rating 
      FROM reviews;
    `;

    const randomReviewResult = await query(randomReviewQuery);
    const averageRatingResult = await query(averageRatingQuery);

    const randomReview = randomReviewResult.rows || []
    const averageRating = averageRatingResult.rows[0]?.average_rating || 0;
    return { randomReview, averageRating };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { randomReview: null, averageRating: 0 };
  }
};
