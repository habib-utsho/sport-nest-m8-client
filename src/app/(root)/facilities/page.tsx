import type { Metadata } from "next";
import FacilityCard, { type FacilityCardData } from "@/components/shared/FacilityCard";

export const metadata: Metadata = {
  title: "All Facilities | SportsNest",
};

type ServerFacility = FacilityCardData & { _id: string };

export default async function AllFacilitiesPage() {

  const facilities = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/facilities`, {
    cache: "no-store",
  });

  const facilitiesData: ServerFacility[] = await facilities.json();

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All Facilities</h1>
        <p className="mt-4 text-muted-foreground">
          Browse every venue on SportsNest and book your next game.
        </p>
      </div>

      {facilitiesData.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          No facilities have been listed yet.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilitiesData.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
      )}
    </section>
  );
}
