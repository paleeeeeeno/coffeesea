import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Seo from "../components/Seo";
import { api } from "../api/client";

function normalizeCafes(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

async function fetchCafes() {
  const res = await api.get("/cafes/");
  return normalizeCafes(res.data);
}

export default function Cafes() {
  const [selectedCafe, setSelectedCafe] = useState(null);

  const {
    data: cafes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cafes"],
    queryFn: fetchCafes,
  });

  useEffect(() => {
    if (!selectedCafe && cafes.length > 0) {
      setSelectedCafe(cafes[0]);
    }
  }, [cafes, selectedCafe]);

  const mapUrl =
    selectedCafe?.latitude && selectedCafe?.longitude
      ? `https://maps.google.com/maps?q=${selectedCafe.latitude},${selectedCafe.longitude}&z=16&output=embed`
      : "";

  return (
    <>
      <Seo
        title="Кофейни — Coffee Sea"
        description="Адреса кофеен Coffee Sea во Владивостоке, телефоны, график работы и карта."
      />

      <section className="wave-bg page-section overflow-hidden">
        <div className="page-container">
          <h1 className="page-title cafes-title">Кофейни</h1>

          {isLoading && (
            <p className="mt-10 text-center uppercase text-white/70">
              Загрузка кофеен...
            </p>
          )}

          {isError && (
            <p className="mt-10 text-center uppercase text-red-200">
              Не удалось загрузить кофейни
            </p>
          )}

          {!isLoading && !isError && cafes.length === 0 && (
            <p className="mt-10 text-center uppercase text-white/70">
              Кофейни пока не добавлены
            </p>
          )}

          {!isLoading && !isError && cafes.length > 0 && (
            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
              <div className="grid gap-5">
                {cafes.map((cafe) => (
                  <button
                    key={cafe.id}
                    type="button"
                    onClick={() => setSelectedCafe(cafe)}
                    className={`rounded-[28px] p-5 text-left transition md:p-6 ${
                      selectedCafe?.id === cafe.id
                        ? "border border-white bg-white text-[#1d2946]"
                        : "glass-card glow-hover text-white"
                    }`}
                  >
                    <h2 className="text-2xl font-black uppercase leading-tight md:text-3xl">
                      {cafe.title}
                    </h2>

                    <div className="mt-4 space-y-2">
                      <p className="text-sm uppercase leading-6 md:text-base">
                        Адрес: {cafe.address}
                      </p>

                      <p className="text-sm uppercase leading-6 md:text-base">
                        Телефон: {cafe.phone}
                      </p>

                      <p className="text-sm uppercase leading-6 md:text-base">
                        График: {cafe.work_time}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="glass-card glow-hover overflow-hidden rounded-[28px] p-3 md:p-4">
                {mapUrl ? (
                  <iframe
                    title="Карта кофейни"
                    src={mapUrl}
                    className="h-[320px] w-full rounded-[22px] md:h-[500px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-[320px] items-center justify-center text-center text-sm uppercase text-white/70 md:h-[500px] md:text-base">
                    У кофейни не указаны координаты
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}