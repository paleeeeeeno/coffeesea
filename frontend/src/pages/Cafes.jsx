import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import { api } from "../api/client";

export default function Cafes() {
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);

  useEffect(() => {
    api
      .get("/cafes/")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.results)
            ? res.data.results
            : [];

        setCafes(data);
        setSelectedCafe(data[0] || null);
      })
      .catch((err) => console.log(err));
  }, []);

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
          <h1 className="page-title cafes-title">
            Кофейни
          </h1>

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
        </div>
      </section>
    </>
  );
}