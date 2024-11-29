import React, { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

interface BrandCardProps {
  brand: {
    brandName: string;
    modelImages: string[];
  };
  isNew: boolean; // Prop to indicate if the brand is unvisited
}

const BrandCard: React.FC<BrandCardProps> = ({ brand , isNew  }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const sliderSpeed = 4000; // 4 seconds

  // Slider logic to start cycling images
  useEffect(() => {
    if (brand.modelImages.length > 1) {
      const cycleImages = () => {
        setCurrentImage((prev) => (prev + 1) % brand.modelImages.length);
      };

      const interval = setInterval(cycleImages, sliderSpeed);
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [brand.modelImages.length]);

  const handleBrandClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not logged in.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/track-brand-visit?brandName=${encodeURIComponent(brand.brandName)}`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        console.error("Error tracking brand visit:", response.statusText);
      } else {
      }
    } catch (error) {
      console.error("Error tracking brand visit:", error);
    }
  };
  

  return (
    <Link href={`/carsbrands/${brand.brandName}`} passHref>
      <div
        className="relative w-full h-64 bg-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleBrandClick} // Track visit here
      >
        {/* Background Image Slider */}
        <div className="absolute inset-0 transition-all duration-[2000ms] ease-in-out">
          {brand.modelImages.map((image, index) => (
            <NextImage
              key={index}
              src={`data:image/jpeg;base64,${image}`}
              alt={`${brand.brandName} Image`}
              width={500}
              height={300}
              className={`absolute w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Blur Effect */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-all duration-1000 ${
            isHovered ? "opacity-0 backdrop-blur-0" : "opacity-100 backdrop-blur-[2px]"
          }`}
        ></div>

        {/* Brand Name Overlay */}
        <div
          className={`absolute transition-all duration-700 text-white text-2xl font-bold ${
            isHovered ? "top-2 left-2 text-lg opacity-100" : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100"
          }`}
        >
          {brand.brandName}
        </div>

        {/* "New" Animation for Unvisited Brands */}
        {isNew && (
          <div className="absolute top-4 right-2 bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded-full animate-bounce delay-700">
            <span className="text-red-600">*</span> New <span className="text-red-600">*</span>
          </div>
        )}

      </div>
    </Link>
  );
};

export default BrandCard;
