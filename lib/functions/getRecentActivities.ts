import { query } from "../db";

interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

interface Property {
  id: string;
  title: string;
  created_at: string;
  sold?: boolean;
}

export type ReturnType =
  | {
      type: "user";
      user_id: string;
      first_name: string;
      last_name: string;
      created_at: string;
    }
  | {
      type: "property";
      id: string;
      title: string;
      created_at: string;
      sold: boolean;
    };

export const getRecentActivities = async (): Promise<ReturnType[]> => {
  const newUsers: User[] = (await query(
    "SELECT user_id, first_name, last_name, created_at FROM users ORDER BY created_at DESC LIMIT 5"
  )).rows;

  const newProperties: Property[] = (await query(
    "SELECT id, title, created_at FROM properties WHERE sold = FALSE ORDER BY created_at DESC LIMIT 5"
  )).rows;

  const soldProperties: Property[] = (await query(
    "SELECT id, title, updated_at AS created_at FROM properties WHERE sold = TRUE ORDER BY updated_at DESC LIMIT 5"
  )).rows;

  const allData: ReturnType[] = [
    ...newUsers.map(
      (user): ReturnType => ({
        type: "user",
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        created_at: user.created_at,
      })
    ),
    ...newProperties.map(
      (property): ReturnType => ({
        type: "property", 
        id: property.id,
        title: property.title,
        created_at: property.created_at,
        sold: false, 
      })
    ),
    ...soldProperties.map(
      (property): ReturnType => ({
        type: "property",
        id: property.id,
        title: property.title,
        created_at: property.created_at,
        sold: true,
      })
    ),
  ];

  const sortedData = allData.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return sortedData;
};
