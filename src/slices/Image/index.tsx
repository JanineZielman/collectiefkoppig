import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from './Image.module.scss';

/**
 * Props for `Image`.
 */
export type ImageProps = SliceComponentProps<Content.ImageSlice>;

/**
 * Component for "Image" Slices.
 */
const Image = ({ slice }: ImageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.imageCaption}
    >
      <div className={styles.imageWrapper}>
        <PrismicNextImage field={slice.primary.image} alt="" />
      </div>
      <PrismicRichText field={slice.primary.caption} />
    </section>
  );
};

export default Image;
