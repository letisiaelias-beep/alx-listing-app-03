// components/property/PropertyCard.tsx
import Link from "next/link";
import Image from "next/image";
import React from "react";

type Property = {
  id: string | number;
  title: string;
  price?: number;
  location?: string;
  images?: string[];
  beds?: number;
  baths?: number;
  summary?: string;
  [key: string]: any;
};

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const thumbnail = property.images && property.images.length ? property.images[0] : "/placeholder.png";

  return (
    <article className="border rounded-lg overflow-hidden shadow-sm">
      <Link href={`/property/${property.id}`}>
        <a className="block">
          <div className="relative h-44 w-full">
            <Image src={thumbnail} alt={property.title} fill style={{ objectFit: "cover" }} />
          </div>
        </a>
      </Link>

      <div className="p-3">
        <Link href={`/property/${property.id}`}>
          <a className="text-lg font-medium hover:underline">{property.title}</a>
        </Link>

        {property.location && <p className="text-sm text-gray-500">{property.location}</p>}

        <div className="mt-2 flex items-center justify-between">
          <span className="text-md font-semibold">
            {property.price ? `Ksh ${property.price}` : "Price on request"}
          </span>
          <Link href={`/property/${property.id}`}>
            <a className="text-sm text-blue-600">View</a>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
