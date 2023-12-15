"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import baseURL from "../../../../next.config";
import { getAllCat } from "../../../../api/post";
import { Category } from "@/types/interfaces";
export default function Feed() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("yourPosts");
  const [cat, setCat] = useState<Category[]>([]); // Explicitly define the type
  // var uid = localStorage.getItem("userId");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user data
        const getCat = await getAllCat();

        const catsData = getCat.categories.rows || [];
        console.log(catsData);
        setCat(catsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap align-middle gap-4">
      <Tabs variant="underlined" aria-label="Tabs variants">
        <Tab key="following" title="For you" />
        {cat.length > 0 &&
          cat.map((category) => (
            <Tab key={category.cat_id} title={category.cat_name} />
          ))}
      </Tabs>
    </div>
  );
}
