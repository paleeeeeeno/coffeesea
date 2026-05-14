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
        setCafes(res.data);
        setSelectedCafe(res.data[0]);
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

      <section className="wave-bg relative min-h-screen overflow-hidden px-6 py-20">
        <div className="absolute right-[-120px] top-32 h-[300px] w-[300px] animate-pulse rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <h1 className="page-title cafes-title">
            Кофейни
          </h1>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <div className="grid gap-5">
              {cafes.map((cafe) => (
                <button
                  key={cafe.id}
                  onClick={() => setSelectedCafe(cafe)}
                  className={`p-6 text-left transition ${
                    selectedCafe?.id === cafe.id
                      ? "border border-white bg-white text-[#1d2946]"
                      : "glass-card glow-hover text-white"
                  }`}
                >
                  <h2 className="text-3xl font-black uppercase">
                    {cafe.title}
                  </h2>

                  <p className="mt-3 uppercase">Адрес: {cafe.address}</p>
                  <p className="uppercase">Телефон: {cafe.phone}</p>
                  <p className="uppercase">График: {cafe.work_time}</p>
                </button>
              ))}
            </div>

            <div className="glass-card glow-hover overflow-hidden p-4">
              {mapUrl ? (
                <iframe
                  title="Карта кофейни"
                  src={mapUrl}
                  className="h-[500px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-[500px] items-center justify-center text-center uppercase text-white/70">
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