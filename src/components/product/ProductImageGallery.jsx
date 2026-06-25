import React from 'react';

export default function ProductImageGallery({ images, thumbnail, selectedImage, onSelect, title }) {
  return (
    <div>
      <div className="border border-gray-200 rounded-xl p-6 mb-4 bg-white flex items-center justify-center min-h-[400px]">
        <img
          src={images[selectedImage] || thumbnail}
          alt={title}
          className="max-w-full max-h-[400px] object-contain"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden cursor-pointer bg-white flex items-center justify-center ${
              selectedImage === index
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelect(index)}
          >
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
