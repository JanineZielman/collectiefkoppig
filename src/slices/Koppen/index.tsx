import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./Koppen.module.scss"
import { PrismicNextImage } from "@prismicio/next";


/**
 * Props for `Koppen`.
 */
export type KoppenProps = SliceComponentProps<Content.KoppenSlice>;

/**
 * Component for "Koppen" Slices.
 */
const Koppen = ({ slice }: KoppenProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.koppen}
    >
      {slice.primary.koppen.map((item, i) => (
        <div className={styles.kop} key={`kop${i}`}>
          <div className={styles.duotone}><PrismicNextImage field={item.image} /></div>
          <PrismicRichText field={item.description}/>
        </div>
      ))}
    </section>
  );
};

export default Koppen;
