import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./SmallText.module.scss"
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `SmallText`.
 */
export type SmallTextProps = SliceComponentProps<Content.SmallTextSlice>;

/**
 * Component for "SmallText" Slices.
 */
const SmallText = ({ slice }: SmallTextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.smallText}
    >
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default SmallText;
