import React from "react";

function Breadcrumb({ items }) {
  return (
    <nav className="text-gray-700 mb-4" aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <a href={item.href} className="font-semibold hover:underline">
                {item.label}
              </a>
            ) : (
              <span className="font-semibold">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2">&gt;</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
