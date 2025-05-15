'use client'
import Link from "next/link";
import ZoomableSVG from "@/components/ZoomableSVG"
import { PrismicRichText } from "@prismicio/react";


const Home = ({agenda}) => {
  return (
    <>
      <ZoomableSVG/>
      <div className="agenda">
        <Link href="/agenda"><h2>Agenda</h2></Link>
        <div className="wrapper">
          {agenda.slice(0,4).map((item, i) => {
            return(
              <Link key={`agenda${i}`} href={`/agenda/${item.uid}`} className={`agenda-item ${(item.data.category)?.uid}`}>
                <p className="date">
                  {item.data.date}
                </p>

                <h3>{item.data.title}</h3>
                {item.data.tijd &&  
                  <p><b>Tijd</b> {item.data.tijd}</p>
                }
                {item.data.programma.length > 0 &&
                  <div className="programma"><PrismicRichText field={item.data.programma}/></div>
                }
                {item.data.waar.length > 0 &&
                  <div className="waar"><PrismicRichText field={item.data.waar}/></div>
                }
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
