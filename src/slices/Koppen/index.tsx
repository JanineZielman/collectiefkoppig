'use client'
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./Koppen.module.scss"
import { PrismicNextImage } from "@prismicio/next";
import Masonry from "react-masonry-css"


/**
 * Props for `Koppen`.
 */
export type KoppenProps = SliceComponentProps<Content.KoppenSlice>;

/**
 * Component for "Koppen" Slices.
 */
const Koppen = ({ slice }: KoppenProps): JSX.Element => {
  const breakpointColumns = {
    default: 4, // Default number of columns
    1100: 3, // At 1100px viewport width, switch to 3 columns
    700: 1, // At 700px viewport width, switch to 2 columns
  }
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
        <Masonry
          breakpointCols={breakpointColumns}
          className={styles.koppen}
          columnClassName={styles.koppenColumn}
        >
        {slice.primary.koppen.map((item, i) => (
          <div className={styles.kop} key={`kop${i}`}>
            <div className={styles.duotone}><PrismicNextImage field={item.image} /></div>
            <PrismicRichText field={item.description}/>
          </div>
        ))}
      </Masonry>
    </section>
  );
};

export default Koppen;
