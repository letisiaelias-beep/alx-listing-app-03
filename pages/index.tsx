// pages/index.tsx
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import PropertyCard from "@/components/property/PropertyCard";
import api from "@/lib/api";

type Property = {
  id: string | number;
  title: string;
  location?: string;
  price?: number;
  images?: string[];
  beds?: number;
  baths?: number;
  summary?: string;
  [key: string]: any;
};

const Home: NextPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProperties = async () => {
      try {
        const res = await api.get<Property[]>("/properties");
        if (!cancelled) setProperties(res.data || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
        if (!cancelled) setError("Unable to load properties. Try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProperties();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p className="p-6">Loading properties...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Properties</h1>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
