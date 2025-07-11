"use client";
import { useEffect, useState } from "react";
import Card from "@/components/App/Card";
import { BASE_URL } from "@/constants/app.constants";

export default function Home() {
  const [news, setNews] = useState({
    loading: false,
    data: [],
  });

  useEffect(() => {
    setNews({
      ...news,
      loading: true,
    });

    const fetchNews = async () => {
      try {
        const response = await fetch(BASE_URL + "news");
        const results = await response.json();
        if (results.status == 200) {
          setNews({
            loading: false,
            data: results.data,
          });
        }
      } catch (error) {
        console.log(error);
        setNews({
          loading: false,
          data: [],
        });
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="h-screen md:w-[50%] md:mx-auto relative flex flex-col gap-3 p-2">
      {news.loading && <p>Fetching News...</p>}
      <Card news={news.data} />
    </div>
  );
}
