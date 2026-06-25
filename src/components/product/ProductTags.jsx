import React from 'react';

export default function ProductTags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-lg"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
