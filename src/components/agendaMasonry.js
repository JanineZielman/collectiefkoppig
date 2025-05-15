'use client'
import Masonry from "react-masonry-css"
import Link from "next/link";
import styles from "./Agenda.module.scss"
import { PrismicImage, PrismicRichText } from "@prismicio/react";

const AgendaMasonry = ({agenda}) => {
  const breakpointColumns = {
    default: 4, // Default number of columns
    1100: 3, // At 1100px viewport width, switch to 3 columns
    700: 1, // At 700px viewport width, switch to 2 columns
  }
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={styles.agendaMasonry}
      columnClassName={styles.agendaColumn}
    >
      {agenda.map((item, i) => {
        return(
          <Link key={`agenda${i}`} 
            href={`/agenda/${item.uid}`} 
            className={`agenda-item ${((item.data.category)?.uid || "")}`}
          >
            <div className={`image`}><PrismicImage field={item.data.image}/></div>
            <p className="date">
              {item.data.date}
            </p>
            <h3>{item.data.title}</h3>
            {item.data.tijd &&  
              <p><b>Tijd</b> {item.data.tijd}</p>
            }
            {item.data.programma.length > 0 &&
              <div className="flex"><b>Programma&nbsp;</b> <PrismicRichText field={item.data.programma}/></div>
            }
            {item.data.waar.length > 0 &&
              <div className="flex"><b>Waar&nbsp;</b> <PrismicRichText field={item.data.waar}/></div>
            }
          </Link>
        )
      })}
    </Masonry>
  );
};

export default AgendaMasonry;

        
        
