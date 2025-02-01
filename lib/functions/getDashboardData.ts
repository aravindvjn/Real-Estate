import { query } from "../db";

export const getDashboardData = async () => {
  const totalUsers = await query("SELECT COUNT(*) AS count FROM users");
  const totalProperties = await query("SELECT COUNT(*) AS count FROM properties");
  const soldProperties = await query("SELECT COUNT(*) AS count FROM properties WHERE sold = TRUE");

  return {
    totalUsers: totalUsers.rows[0].count,
    totalProperties: totalProperties.rows[0].count,
    soldProperties: soldProperties.rows[0].count,
  };
};
