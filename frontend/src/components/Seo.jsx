import { useEffect } from "react";

export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector("meta[name='description']");

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = description;
  }, [title, description]);

  return null;
}