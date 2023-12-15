import React, { useState, useRef } from "react";
import { Card, CardBody, Image, CardFooter } from "@nextui-org/react";
import { Post } from "../../types/interfaces";
import "../Cards/card.css";
export default function PostCard({ post }: { post: Post }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSlideshow = () => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
    }, 2000);
  };

  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="flex">
      {post.images.length > 0 && (
        <Card
          shadow="sm"
          key={post.post_id}
          isPressable
          onPress={() => console.log("item pressed")}
          className="m-2 w-72" // Added margin and width for spacing
        >
          <CardBody className="overflow-visible p-0">
            <div onMouseEnter={startSlideshow} onMouseLeave={stopSlideshow}>
              <Image
                alt="Card background"
                className="object-cover w-full h-full"
                src={post.images[currentImageIndex]}
              />
            </div>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{post.title}</b>
            {/* <p className="text-default-500">{post.description}</p> */}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
