import React from 'react'
import { Link } from "react-router";
const Allitemcard = ({tip}) => {
  return (
    <div> <article className="rounded-lg shadow hover:shadow-lg transition h-full flex flex-col">
    <img
      src={tip.image}
      alt={tip.title}
      className="w-full h-40 object-cover rounded-t-lg"
    />

    <div className="flex-1 p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-1 line-clamp-1">{tip.title}</h3>
      <p className="text-gray-500 text-sm mb-2">{tip.category}</p>
      <p className="text-gray-700 flex-1 text-sm line-clamp-3">
        {tip.description}
      </p>

      <Link
        to={`/item/${tip._id}`}
        className="mt-4 inline-block text-center bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
      >
        See More
      </Link>
    </div>
  </article></div>
  )
}

export default Allitemcard