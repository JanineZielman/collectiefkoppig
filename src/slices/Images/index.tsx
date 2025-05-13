import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./Images.module.scss"

/**
 * Props for `Images`.
 */
export type ImagesProps = SliceComponentProps<Content.ImagesSlice>;

/**
 * Component for "Images" Slices.
 */
const Images = ({ slice }: ImagesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.imagesWrapper}
    >
      <div className={styles.images}>
        {slice.primary.images.map((item, i) => (
          <div className={styles.image} key={`images${i}`}>
            <PrismicNextImage field={item.image} />
          </div>
        ))}
      </div>
      <div className={styles.caption}>
        <PrismicRichText field={slice.primary.caption} />
      </div>
    </section>
  );
};

export default Images;
