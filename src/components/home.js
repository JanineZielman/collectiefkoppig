'use client'
import Link from "next/link";
import ZoomableSVG from "@/components/ZoomableSVG"
import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";


const Home = ({agenda}) => {
  return (
    <>
      <ZoomableSVG/>
      <div className="agenda">
        <h2>Agenda</h2>
        <div className="wrapper">
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

                <h3>{item.data.title}</h3>
                <PrismicRichText field={item.data.info}/>
              </Link>
            )
          })}
        </div>
        <div className="button">
          <Link href="/agenda">Bekijk alles</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
