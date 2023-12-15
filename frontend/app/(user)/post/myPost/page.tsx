"use client";
import React, { useState, useEffect } from "react";
import profilePic from "../../../../_assets/images/profilePic.png";
import { Card, Button } from "@nextui-org/react"; // Import Next UI Card components
import Link from "next/link";
import Image from "next/image";
import { getSavePost, getUserPost } from "../../../../api/post";
import { User, Post } from "../../../../types/interfaces";
import PostCard from "../../../../components/Cards/postCard";
const ProfileMain = () => {
  //   console.log(baseURL);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [activeTab, setActiveTab] = useState("yourPosts");
  var uid = 11;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let postData = [];
        if (activeTab === "yourPosts") {
          const userPost = await getUserPost(11);
          postData = userPost.posts || [];
        } else if (activeTab === "savedPosts") {
          const savePost = await getSavePost(11);

          postData = savePost.posts || [];
        }

        setPosts(postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uid, activeTab]);

  return (
    <div className="profile">
      <div className="userBio">
        <div className="tabs">
          <button
            className={`yourPosts ${activeTab === "yourPosts" ? "active" : ""}`}
            onClick={() => setActiveTab("yourPosts")}
          >
            Your Posts
          </button>
          <button
            className={`savedPosts ${
              activeTab === "savedPosts" ? "active" : ""
            }`}
            onClick={() => setActiveTab("savedPosts")}
          >
            Saved Posts
          </button>
        </div>

        {loading ? (
          <div>hi</div>
        ) : (
          <div className="card-container col-12">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  key={post.post_id}
                  href={`/post-details/${post.post_id}`}
                  className="card-link"
                >
                  <PostCard key={post.post_id} post={post} />
                </Link>
              ))
            ) : (
              <div>No posts available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMain;
