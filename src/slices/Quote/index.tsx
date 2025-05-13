import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from './Quote.module.scss';

/**
 * Props for `Quote`.
 */
export type QuoteProps = SliceComponentProps<Content.QuoteSlice>;

/**
 * Component for "Quote" Slices.
 */
const Quote = ({ slice }: QuoteProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.quote}
    >
      <PrismicRichText field={slice.primary.quote} />
      <div className={styles.caption}>
        <PrismicRichText field={slice.primary.source} />
      </div>
    </section>
  );
};

export default Quote;
