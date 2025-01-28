import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: string[] | number[]) => {
  return pool.query(text, params);
};

// const query = `
// INSERT INTO properties (
//   title, location, rate, bedrooms, image_urls, bathrooms, garage, size, price, features
// ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
// RETURNING *;
// `;

// const values = [
// title,
// location,
// rate,
// bedrooms,
// imageUrls,
// bathrooms,
// garage,
// size,
// price,
// features,
// ];