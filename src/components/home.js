'use client'
import Link from "next/link";
import ZoomableSVG from "@/components/ZoomableSVG"
import * as prismic from "@prismicio/client";

const Home = ({agenda}) => {
  return (
    <>
      <ZoomableSVG/>
      <div className="agenda">
        <h2>Agenda</h2>
        {agenda.map((item, i) => {
          return(
            <Link key={`agenda${i}`} href={`/agenda/${item.uid}`} className={`agenda-item ${(item.data.category)?.uid}`}>
              <p className="date">
                {item.data.date
                  ? new Date(item.data.date).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                    })
                  : "Geen datum beschikbaar"}
              </p>

              <h3>{prismic.asText(item.data.title)}</h3>
            </Link>
          )
        })}
        <div className="button">
          <Link href="/agenda">Bekijk alles</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
