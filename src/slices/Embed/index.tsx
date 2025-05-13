'use client'
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./Embed.module.scss"
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `Embed`.
 */
export type EmbedProps = SliceComponentProps<Content.EmbedSlice>;

/**
 * Component for "Embed" Slices.
 */
const Embed = ({ slice }: EmbedProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.embedWrapper}
    >
      <div
        className={styles.embed}
        dangerouslySetInnerHTML={{
          __html: slice.primary.embed.html ? slice.primary.embed.html : '',
        }}
      />
      <div className={styles.caption}>
        <PrismicRichText field={slice.primary.caption} />
      </div>
    </section>
  );
};

export default Embed;
