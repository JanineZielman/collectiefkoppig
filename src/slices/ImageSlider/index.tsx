'use client'
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import dynamic from "next/dynamic";
import { PrismicNextImage } from "@prismicio/next";
import styles from "./Slider.module.scss"

/**
 * Props for `ImageSlider`.
 */
export type ImageSliderProps = SliceComponentProps<Content.ImageSliderSlice>;

/**
 * Component for "ImageSlider" Slices.
 */
const ImageSlider = ({ slice }: ImageSliderProps): JSX.Element => {
  const Slider = dynamic(() => import("react-slick"), { ssr: false });
  console.log(slice.primary)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          variableWidth: false,
        }
      }
    ]
  };
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.slider}
    >
      <Slider {...settings}>
        {slice.primary.images.map((item, i) => (
          <div key={`image${i}`}>
            <PrismicNextImage field={item.image} />
            {item.image.alt && <p>{item.image.alt}</p>}
            <PrismicRichText field={item.caption} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ImageSlider;
