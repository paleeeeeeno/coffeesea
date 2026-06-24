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
            <div className="mx-auto mt-12 grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex flex-col gap-5">
                {cafes.map((cafe) => {
                  const active = selectedCafe?.id === cafe.id;

                  return (
                    <button
                      key={cafe.id}
                      type="button"
                      onClick={() => setSelectedCafe(cafe)}
                      className={`rounded-[28px] border p-6 text-left text-white transition md:p-7 ${
                        active
                          ? "border-white/50 bg-white/10 shadow-2xl"
                          : "border-white/15 bg-[#07101f]/85 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <h2 className="text-2xl font-black uppercase leading-tight tracking-wide md:text-3xl">
                        {cafe.title || cafe.name}
                      </h2>

                      <div className="mt-5 space-y-3 text-sm uppercase leading-6 text-white/75 md:text-base">
                        <p>Адрес: {cafe.address}</p>
                        <p>Телефон: {cafe.phone}</p>
                        <p>График: {cafe.work_time}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[28px] border border-white/15 bg-[#07101f]/85 p-4 shadow-2xl backdrop-blur">
                {mapUrl ? (
                  <iframe
                    title="Карта кофейни"
                    src={mapUrl}
                    className="h-[420px] w-full rounded-[22px] md:h-[560px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-[420px] items-center justify-center rounded-[22px] border border-white/10 text-center text-sm uppercase text-white/70 md:h-[560px] md:text-base">
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