"use client";

import React, { useEffect, useState } from "react";

interface SliderProps {
  brandName: string;
}

const CustomSlider: React.FC<SliderProps> = ({ brandName }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchBrandImages = async () => {
      try {
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 
        const response = await fetch(`${BASE_URL}/get-brand-images/${brandName}`); 
        if (!response.ok) {
          throw new Error(`Failed to fetch brand images: ${response.statusText}`);
        }
        const data = await response.json();
        setImages(data.images || []);
      } catch (err) {
        console.error("Error fetching brand images:", err);
      }
    };

    fetchBrandImages();
  }, [brandName]);

  // Set an interval to automatically slide through the images
  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through images
      }, 3500); // Change image every 2.5 seconds

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [images]);

  return (
    <div className="my-5 border border-black h-96 relative overflow-hidden rounded-xl">
      <div
        className="relative w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Move slides horizontally
        }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-lg font-bold text-gray-500">No images available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSlider;
