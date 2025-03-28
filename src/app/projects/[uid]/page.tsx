import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Layout from "@/components/layout"
import { PrismicNextImage } from "@prismicio/next";
import Project from '@/components/project'

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("project", uid).catch(() => notFound());

  return {
    title: page.data.title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

type PageCategory = prismic.ContentRelationshipField<"page"> & { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("project", uid).catch(() => notFound());
  const navigation = await client.getByType("navigation");
  

  return (
    <div className={`page ${(page.data.category as PageCategory)?.uid}`}>
    <Layout navigation={navigation.results[0].data}>
      <Project page={page}/>
      <SliceZone slices={page.data.slices} components={components} />
      <div className="share">
        <svg width="231" height="114" viewBox="0 0 231 114" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M129.529 74.2682C128.969 74.6924 128.494 75.0202 128.063 75.3866C127.748 75.6501 128.179 76.6206 128.719 76.7298C129.368 76.8648 130.017 77.3533 130.718 76.8584C131.007 77.3726 131.437 77.1926 131.81 77.0384C132.029 76.9484 132.17 76.672 132.382 76.5499C133.102 76.1257 133.346 76.8712 133.745 77.1669C134.343 77.6168 134.85 78.1824 135.442 78.6452C136.091 79.1593 136.817 79.5771 137.447 80.1106C137.903 80.4962 138.347 80.9525 138.649 81.4603C138.996 82.0323 139.163 82.7072 139.446 83.3306C139.825 84.1726 140.031 85.2202 140.667 85.7987C141.753 86.7884 142.004 88.2153 142.891 89.2822C143.174 89.6229 143.27 90.1178 143.527 90.497C143.739 90.8055 144.009 91.1718 144.33 91.2875C146.053 91.8852 146.342 91.8981 147.551 91.4418C148.335 91.1461 149.222 90.9147 149.813 90.3748C150.758 89.52 152.197 89.2179 152.692 87.8682C152.969 87.1162 153.161 86.3257 153.502 85.6058C154.01 84.5196 154.633 83.4849 155.18 82.4115C155.475 81.8331 155.739 81.2289 155.97 80.6183C156.343 79.6221 156.677 78.613 157.024 77.6039C157.178 77.1605 157.378 77.0512 157.885 77.2247C158.541 77.4433 159.261 77.5397 159.955 77.5654C160.874 77.6039 160.636 78.3688 160.63 78.7608C160.611 79.8213 160.341 80.8754 160.276 81.9359C160.161 83.7869 160.148 85.6444 160.045 87.5019C159.974 88.8195 159.833 90.137 159.724 91.4546C159.46 94.6489 159.113 97.8369 158.985 101.031C158.933 102.362 159.177 103.692 158.92 105.042C158.869 105.305 159.357 105.678 159.679 106.109C159.679 106.109 159.531 106.192 159.293 106.321C159.518 106.391 159.666 106.494 159.775 106.462C160.296 106.327 160.829 106.218 161.305 105.98C161.562 105.852 161.819 105.524 161.877 105.247C162.044 104.425 162.172 103.621 162.565 102.837C162.828 102.297 162.68 101.545 162.699 100.89C162.712 100.273 162.732 99.6493 162.699 99.0323C162.68 98.666 162.661 98.2418 162.468 97.959C161.806 97.0013 162.16 95.9987 162.243 95.0153C162.423 92.9779 162.699 90.9404 162.841 88.903C162.963 87.1162 162.892 85.3166 163.027 83.5298C163.169 81.7238 163.458 79.9306 163.651 78.3752C164.396 78.0603 164.994 77.7453 165.637 77.5654C166.202 77.4047 166.839 77.4754 167.398 77.3083C168.041 77.1155 168.638 76.7684 169.133 76.5434C169.165 77.244 169.133 78.131 169.275 78.9858C169.358 79.455 169.731 79.8856 170.007 80.3098C170.168 80.5605 170.521 80.7661 170.547 81.0168C170.663 82.013 171.698 81.9423 172.18 82.5208C172.681 83.1249 173.446 83.5234 173.909 84.1469C174.114 84.4297 173.966 85.0788 173.806 85.503C172.977 87.6883 172.205 89.9057 172.006 92.2387C171.833 94.2697 171.884 96.3265 171.884 98.3703C171.884 100.176 171.993 101.989 171.98 103.795C171.98 104.354 171.653 104.92 171.659 105.479C171.672 106.507 172.173 106.751 172.899 106.636C173.272 106.578 173.658 106.623 174.146 106.623C174.873 105.794 175.065 104.785 174.898 103.474C174.628 101.398 174.776 99.2701 174.693 97.1684C174.564 94.1091 174.95 91.1333 176.017 88.2539C176.267 87.5726 176.434 86.8592 176.621 86.2293C177.739 85.9851 178.337 86.7499 179.082 87.2191C179.924 87.7461 180.818 88.2217 181.73 88.6138C182.849 89.0958 184.019 89.4622 185.163 89.8864C185.265 89.9249 185.368 90.0021 185.471 90.0021C186.403 89.9764 186.525 90.1242 186.622 90.9661C186.821 92.7593 186.268 94.4754 186.146 96.2365C186.069 97.3548 185.927 98.4667 185.837 99.5851C185.715 101.057 185.619 102.535 185.51 104.013C185.439 104.913 185.805 105.35 186.757 105.402C187.129 105.421 187.528 105.44 187.868 105.325C188.087 105.247 188.363 104.945 188.383 104.72C188.543 102.734 188.627 100.742 188.775 98.7559C188.845 97.7726 189.006 96.7956 189.109 95.8187C189.302 93.9934 189.488 92.1616 189.655 90.5098C190.909 89.4879 192.11 88.5045 193.28 87.5469C194.212 88.3567 195.003 89.3529 196.385 89.7257C197.317 89.9763 198.146 90.6962 198.936 91.3132C199.56 91.8081 199.232 92.5408 199.097 93.1707C198.409 96.3457 198.493 99.5144 199.129 102.677C199.502 104.528 199.508 106.379 199.476 108.243C199.463 108.95 199.572 109.663 199.585 110.37C199.585 110.736 199.482 111.103 199.457 111.475C199.418 112.131 199.367 112.812 200.389 112.664C200.504 112.652 200.639 112.877 200.774 112.973C201.462 113.436 202.201 113.14 202.433 112.317C202.471 112.176 202.548 112.041 202.58 111.893C202.677 111.482 203.185 111.083 202.51 110.659C202.317 110.537 202.304 110.049 202.291 109.727C202.246 107.703 202.265 105.678 202.169 103.653C202.118 102.644 201.764 101.642 201.726 100.633C201.655 98.8459 201.706 97.0463 201.732 95.2595C201.732 94.8803 201.854 94.5075 201.918 94.1348C203.757 94.514 205.479 95.1117 206.932 96.365C208.269 97.5219 209.882 97.9525 211.611 97.8111C212.697 97.7212 213.751 97.5219 214.689 96.7956C215.351 96.2815 216.245 96.0758 216.99 95.658C217.858 95.1696 218.681 94.5911 219.548 94.0319C219.548 94.2505 219.574 94.4947 219.548 94.7325C219.195 97.3548 218.796 99.9771 218.475 102.606C218.237 104.521 218.012 106.449 217.948 108.371C217.903 109.65 218.115 110.942 218.295 112.215C218.346 112.6 218.578 113.018 219.176 112.986C219.471 112.973 219.78 113.217 220.088 113.307C220.242 113.352 220.442 113.352 220.583 113.288C221.219 112.999 221.341 112.42 221.297 111.81C221.174 110.203 220.898 108.602 220.911 106.996C220.924 105.582 221.258 104.181 221.425 102.767C221.521 101.931 221.554 101.095 221.65 100.26C221.759 99.3151 221.933 98.3832 222.042 97.4384C222.158 96.4678 222.203 95.4845 222.331 94.514C222.415 93.897 222.601 93.2928 222.71 92.6758C222.768 92.3544 222.633 91.8595 222.807 91.7181C223.36 91.2811 223.983 90.8826 224.639 90.6512C225.095 90.4905 225.532 90.4455 225.847 90.0021C226.104 89.6421 226.432 89.3079 226.785 89.038C227.634 88.3953 228.045 87.4954 228.418 86.5442C228.983 85.1045 229.768 83.7227 230.115 82.2316C230.468 80.7276 230.545 79.0951 229.17 77.8675C228.309 77.1026 227.569 76.1321 226.599 75.5601C225.59 74.9624 224.382 74.6281 223.218 74.371C222.235 74.1525 221.194 74.2425 220.178 74.1397C219.388 74.0561 218.603 73.8762 217.813 73.754C217.08 73.6448 216.29 73.3491 215.615 73.5098C214.548 73.7605 213.346 73.7348 212.478 74.6796C212.215 74.9688 211.624 75.0138 211.167 75.0523C209.779 75.168 208.378 75.1937 206.989 75.3159C206.327 75.3737 205.659 75.5344 205.016 75.7208C203.795 76.0807 202.587 76.492 201.372 76.8841C201.321 76.8969 201.256 76.9034 201.231 76.9355C200.537 77.861 199.123 77.8289 198.563 78.9729C198.416 79.2814 198.062 79.5707 197.741 79.6992C196.751 80.0849 195.787 80.4898 195.035 81.2803C194.964 81.351 194.501 81.2418 194.476 81.1389C194 79.5 192.901 78.3302 191.673 77.2376C191.538 77.1219 191.5 76.8905 191.436 76.7041C191.011 75.5151 190.876 74.1782 189.932 73.2399C189.379 72.6935 188.762 72.0958 188.055 71.8451C186.602 71.331 185.066 71.0289 183.569 70.6497C183.029 70.5147 182.489 70.3219 181.943 70.2962C181.364 70.2705 180.786 70.4376 180.201 70.489C179.802 70.5276 179.404 70.5211 179.005 70.5276C178.761 70.5276 178.517 70.5404 178.279 70.5276C178.118 70.5147 177.958 70.4697 177.797 70.4376C177.855 70.2898 177.874 70.1162 177.971 70.007C179.05 68.7215 179.635 67.3332 179.134 65.6172C178.993 65.1416 179.147 64.5888 179.005 64.1132C178.665 62.9306 178.414 61.7544 177.713 60.6489C176.814 59.2221 175.631 58.213 174.268 57.3518C173.51 56.8761 172.694 56.4841 171.871 56.1306C171.074 55.7899 170.933 55.038 170.637 54.3824C170.393 53.8425 170.264 53.2448 169.969 52.7434C168.683 50.5389 167.366 48.3472 166.042 46.1684C165.913 45.9627 165.669 45.8277 165.418 45.6028C165.335 44.7994 164.795 44.1117 164.229 43.4047C163.676 42.7298 163.22 41.9843 162.642 41.3672C162.34 41.1102 162.057 40.8402 161.742 40.6088C160.99 40.0561 160.264 39.4584 159.46 38.9892C158.747 38.565 157.943 38.3079 157.204 37.9223C156.831 37.7294 156.549 37.3631 156.176 37.1638C155.739 36.9325 155.231 36.8232 154.781 36.6047C153.605 36.0326 152.885 34.9593 152.217 33.9309C151.253 32.4527 151.388 30.7109 151.388 29.0141C151.388 27.6965 151.908 26.5204 152.165 25.2735C152.384 24.1808 152.551 23.0754 152.654 21.9699C152.718 21.2307 152.352 20.6394 151.792 20.1124C151.06 19.4118 150.301 18.6856 149.768 17.8372C149.35 17.1816 148.72 16.6931 148.367 16.0954C147.602 14.8035 146.561 13.6273 146.548 11.892C146.548 11.1079 146.053 10.0474 144.896 9.66817C144.433 9.51391 144.073 9.14113 143.431 9.59747C143.559 9.28253 143.611 9.14756 143.668 9.00616C142.91 8.94189 142.396 9.39179 141.882 9.82885C141.689 9.98953 141.522 10.1823 141.348 10.3623C141.258 10.4523 141.091 10.5551 141.104 10.6258C141.207 11.185 141.297 11.7634 141.483 12.2969C141.978 13.6916 143.206 14.3729 144.388 15.0349C144.864 15.2984 145.243 15.4462 145.192 16.0825C145.179 16.2496 145.526 16.6031 145.687 16.5903C146.451 16.5324 146.381 17.1495 146.619 17.5608C147.011 18.2357 147.467 18.872 147.949 19.4825C148.489 20.1703 149.292 20.7358 149.588 21.5071C149.839 22.1563 149.633 23.0432 149.459 23.7888C148.894 26.2183 148.129 28.6156 148.617 31.1672C148.81 32.1956 148.862 33.2689 149.222 34.233C149.524 35.0364 150.205 35.6792 150.668 36.4311C151.053 37.061 151.568 37.3759 152.281 37.5238C152.538 37.5752 152.679 38.0637 152.949 38.2179C153.483 38.52 154.055 38.8221 154.646 38.9506C155.154 39.0599 155.527 39.227 155.938 39.574C156.446 40.0047 157.166 40.1589 157.744 40.5188C158.297 40.8659 158.792 41.3094 159.299 41.7272C159.454 41.8557 159.518 42.0999 159.679 42.1899C161.08 42.9612 161.581 44.4459 162.378 45.6671C163.606 47.5502 164.66 49.5555 165.804 51.4966C166.466 52.6149 167.166 53.7075 167.848 54.813C166.948 55.038 166.183 55.3272 165.399 55.3979C164.763 55.4557 164.101 55.2436 163.458 55.1472C163.406 55.1408 163.329 55.0701 163.31 55.0894C162.082 55.9635 160.63 55.8028 159.248 55.9892C159.1 56.0085 158.927 55.957 158.798 56.0149C157.911 56.407 157.757 56.3041 157.333 55.34C156.812 54.1574 156.214 53.0134 155.649 51.8501C155.109 50.7381 154.633 49.5877 154.003 48.5207C153.168 47.1003 152.178 45.7763 151.317 44.3688C150.738 43.4175 150.34 42.3442 149.729 41.4122C148.778 39.9597 147.782 38.52 146.676 37.1831C145.976 36.3347 145.52 35.3256 144.768 34.5222C144.716 34.4708 144.723 34.368 144.665 34.323C143.739 33.616 143.264 32.5427 142.499 31.7071C141.702 30.8394 140.77 30.0939 139.999 29.2069C139.234 28.3264 138.597 27.343 137.903 26.4047C137.82 26.289 137.704 26.199 137.588 26.109C137.492 26.0319 137.299 25.9869 137.28 25.9033C136.913 24.3737 135.454 23.9173 134.445 23.0368C133.97 22.619 133.417 22.3555 133.738 21.5778C133.771 21.4943 133.571 21.3143 133.378 21.0379C133.398 20.9994 133.539 20.7744 133.591 20.6973C133.346 19.8939 133.218 19.1612 132.903 18.5185C132.582 17.8693 132.119 17.2651 131.63 16.7253C131.431 16.5003 130.994 16.3975 130.666 16.4039C129.85 16.4232 128.982 16.4039 128.23 16.6674C127.742 16.8474 127.427 17.5094 127.041 17.9593C126.887 18.1457 126.701 18.3256 126.617 18.5442C126.533 18.7498 126.495 19.0069 126.546 19.219C126.791 20.2281 127.318 21.0829 128.115 21.7578C128.487 22.0663 128.873 22.3619 129.271 22.6319C130.711 23.5895 132.292 24.3865 133.571 25.5241C134.696 26.5139 135.532 27.8508 136.425 29.0848C137.306 30.2996 138.302 31.3858 139.484 32.2984C139.542 32.3434 139.632 32.3691 139.677 32.427C140.95 34.1688 142.184 35.9362 143.489 37.6459C144.26 38.655 145.198 39.5419 145.95 40.5574C146.503 41.303 146.876 42.1771 147.338 42.9869C148.084 44.3045 148.823 45.6221 149.575 46.9268C150.79 49.0221 152.082 51.0852 153.226 53.219C153.965 54.5945 154.524 56.0727 155.122 57.5253C155.443 58.303 155.154 59.0036 154.396 59.3442C154.158 59.4535 153.772 59.4535 153.554 59.3249C152.512 58.7208 151.51 58.0395 150.481 57.4096C150.192 57.2296 149.877 57.0754 149.549 56.9854C148.347 56.6448 147.518 55.7321 146.529 55.0765C145.847 54.6266 145.05 54.3374 144.375 53.8811C143.167 53.0584 142.004 52.165 140.84 51.2845C139.761 50.4682 138.687 49.6519 137.653 48.7778C136.881 48.1287 136.168 47.4088 135.448 46.689C135.287 46.5283 135.236 46.2584 135.107 45.9884C135.03 46.0141 134.908 46.0527 134.767 46.0977C135.082 45.0051 134.092 44.8444 133.539 44.4137C133.128 44.0924 132.556 43.9703 132.106 43.681C131.907 43.5525 131.881 43.1669 131.688 43.0126C130.711 42.2349 129.792 41.2708 128.674 40.8016C127.735 40.4032 127.26 39.5612 126.405 39.1499C125.653 38.7835 124.914 38.3914 124.207 37.948C123.365 37.4274 122.542 36.8682 121.745 36.2769C120.248 35.165 118.737 34.0788 117.015 33.3204C115.993 32.8705 115.048 32.292 114.135 31.6043C113.403 31.0515 112.316 30.9808 111.397 30.6595C111.102 30.5567 110.857 30.306 110.562 30.171C110.292 30.0489 109.958 29.8625 109.701 29.9204C108.891 30.1132 108.03 30.0296 107.31 30.7495C106.718 31.3408 105.722 31.4757 105.189 32.2599C104.334 33.526 103.44 34.7665 102.566 36.0198C102.284 36.4247 101.93 36.8039 101.718 37.2474C101.178 38.3786 100.034 39.0792 99.6934 40.3775C99.1407 42.4856 98.3437 44.5359 97.8359 46.6504C97.5981 47.6274 97.7974 48.7071 97.7845 49.7419C97.7717 51.1045 97.9966 52.4285 98.4208 53.7139C98.7036 54.5816 99.025 55.4364 99.3977 56.272C99.6677 56.8633 99.9955 57.4417 100.4 57.9495C100.992 58.695 101.943 58.8364 102.785 59.1128C103.363 59.2992 103.955 59.3249 104.617 59.2349C105.157 59.1642 105.786 59.7812 106.378 60.0962C106.532 60.1733 106.68 60.2761 106.84 60.3147C107.67 60.514 108.512 60.6746 109.328 60.906C109.816 61.0474 110.266 61.3688 110.761 61.478C112.207 61.793 113.66 62.0372 115.112 62.3136C116.25 62.5257 117.381 62.7506 118.525 62.9563C118.769 63.0013 119.026 62.9563 119.374 62.9563C119.476 63.9718 119.592 64.9873 119.669 66.0028C119.682 66.1828 119.541 66.382 119.438 66.5491C118.859 67.5389 118.853 68.6444 118.904 69.7242C118.924 70.1741 119.277 70.6818 119.618 71.0225C120.453 71.8644 121.225 72.7964 122.529 73.0149C123.384 73.1563 124.2 73.5741 125.062 73.6962C126.405 73.889 127.774 73.9404 129.13 74.0625C129.194 74.0625 129.259 74.1268 129.516 74.2682H129.529ZM115.485 36.264C116.513 36.9132 117.31 37.4916 118.165 37.9415C119.483 38.6292 120.865 39.2013 122.182 39.8954C122.581 40.1075 122.812 40.6731 123.217 40.8338C124.368 41.2901 125.004 42.2735 125.833 43.0769C126.444 43.6618 127.151 44.1567 127.857 44.6323C128.417 45.0051 129.149 45.1786 129.612 45.6349C130.435 46.4576 131.399 47.0746 132.292 47.788C132.344 47.8266 132.44 47.8138 132.517 47.8266C133.276 47.9423 133.803 48.3665 134.047 49.0735C134.336 49.909 134.908 50.4618 135.628 50.9245C136.271 51.3423 136.894 51.7858 137.511 52.2293C138.437 52.8913 139.356 53.5533 140.268 54.2281C141.413 55.0765 142.981 55.1344 143.983 56.2848C144.311 56.664 144.864 56.8569 145.333 57.1075C146.162 57.5639 146.998 57.9945 147.827 58.4444C147.898 58.4829 147.949 58.5729 147.994 58.6501C148.18 58.9521 148.29 59.3699 148.56 59.537C149.376 60.0383 150.231 60.4947 151.111 60.861C152.056 61.2531 152.32 61.9537 151.947 62.9177C151.619 63.7597 151.407 64.6659 151.272 65.5658C151.111 66.6005 150.494 67.4939 149.652 67.5518C148.894 67.6032 148.168 67.3461 147.364 67.8089C146.811 68.1238 145.944 67.9117 145.224 67.9117C144.453 67.9117 143.681 67.931 142.916 67.8731C141.85 67.7896 140.776 67.6867 139.729 67.5003C138.944 67.3589 138.16 67.1211 137.415 66.8319C135.949 66.2663 134.516 65.6172 133.044 65.0644C132.781 64.968 132.389 65.2701 132.08 65.2251C131.052 65.0773 130.049 64.9166 128.989 65.0709C128.378 65.1608 127.684 65.0323 127.093 64.8138C125.897 64.3767 124.766 63.7726 123.577 63.3098C122.78 63.0013 122.208 62.6028 122.279 61.6451C122.375 60.3854 122.407 59.1128 122.574 57.8659C122.78 56.3748 122.696 56.182 121.231 55.8349C120.222 55.5971 119.946 55.7449 119.798 56.7862C119.624 57.9945 119.541 59.2092 119.386 60.4175C119.361 60.6232 119.2 60.951 119.071 60.9703C118.718 61.0153 118.255 61.0474 117.998 60.861C116.989 60.1219 115.781 60.379 114.688 60.0833C113.66 59.807 112.586 59.7105 111.552 59.447C110.742 59.2414 110.035 58.7722 109.122 58.785C108.569 58.7915 108.017 58.3415 107.368 58.0587C107.792 57.731 108.074 57.5896 108.261 57.3582C109.328 56.0085 110.427 54.678 111.404 53.264C111.995 52.4092 112.426 51.4387 112.869 50.4939C113.518 49.0992 114.335 47.7302 114.675 46.2519C115.144 44.1952 115.292 42.0614 115.485 39.9533C115.588 38.7835 115.504 37.5945 115.504 36.264H115.485ZM144.594 70.0712C144.87 70.2512 145.102 70.5211 145.327 70.5147C146.194 70.4954 147.056 70.3926 147.917 70.3026C148.09 70.2833 148.245 70.1098 148.412 70.0969C149.074 70.052 149.774 70.1676 150.398 70.0005C151.253 69.7756 151.516 70.2769 151.709 70.8554C151.857 71.2988 151.902 71.7937 151.902 72.2693C151.902 73.1434 152.519 73.7219 152.827 74.4482C153.097 75.078 153.431 75.6179 154.023 75.9393C154.505 76.2028 154.389 76.5177 154.228 76.8648C153.875 77.6425 153.489 78.4073 153.142 79.185C152.499 80.6505 151.979 82.1801 151.208 83.5748C150.674 84.5453 150.166 85.4709 149.999 86.5699C149.967 86.7885 149.871 87.0777 149.71 87.1805C149.061 87.579 148.958 88.5238 148.058 88.7102C147.538 88.8195 147.081 89.2308 146.58 89.4686C146.49 89.5136 146.265 89.43 146.188 89.3336C145.892 88.9994 145.532 88.6716 145.385 88.2731C144.922 87.052 144.337 85.9272 143.521 84.8924C142.788 83.9733 142.242 82.9385 141.946 81.7559C141.792 81.1196 141.329 80.5283 140.885 80.0142C140.436 79.4871 139.838 79.0951 139.317 78.6259C138.893 78.2467 138.475 77.861 138.083 77.4433C137.878 77.2183 137.543 76.8327 137.614 76.6913C137.736 76.4342 138.192 76.0935 138.392 76.1514C139.105 76.3828 139.169 75.8429 139.311 75.4637C139.664 74.5253 140.005 73.5805 140.275 72.6164C140.513 71.768 141.04 70.9068 140.416 70.0134C139.484 70.052 139.369 70.007 139.234 69.4478C140.416 69.6856 141.554 69.9748 142.711 70.1162C143.309 70.1869 143.951 70.9453 144.581 70.0584L144.594 70.0712ZM102.065 43.1219C102.001 43.0897 101.936 43.064 101.866 43.0319C102.091 42.6398 102.29 42.2349 102.547 41.8686C103.126 41.033 103.743 40.2168 104.334 39.3877C104.482 39.1756 104.572 38.912 104.732 38.7128C105.401 37.8644 106.146 37.0739 106.75 36.1805C107.625 34.8886 108.107 33.2625 109.836 32.7419C110.176 32.6391 110.536 32.4205 110.857 32.472C111.243 32.5298 111.603 32.7998 111.937 33.0311C112.137 33.1661 112.355 33.3911 112.4 33.6096C112.541 34.3294 112.67 35.0686 112.683 35.8013C112.702 37.1124 112.651 38.4236 112.606 39.7347C112.567 40.8659 112.625 42.0164 112.413 43.1154C112.092 44.7672 111.822 46.4255 110.909 47.9487C109.881 49.6648 109.238 51.6122 107.92 53.1741C107.323 53.8875 106.763 54.6395 106.095 55.2886C105.555 55.8156 104.854 56.1756 104.27 56.664C103.691 57.1461 103.171 57.1975 102.586 56.6962C101.802 56.0213 101.699 55.0701 101.403 54.1446C100.876 52.5056 100.625 50.8667 100.6 49.157C100.58 47.6595 100.818 46.2584 101.519 44.9215C101.802 44.3752 101.885 43.7325 102.065 43.1347V43.1219ZM122.639 65.2444C122.793 65.2958 122.921 65.3408 123.056 65.3922C124.181 65.855 125.267 66.4784 126.437 66.7484C127.922 67.0954 129.464 67.1854 130.994 67.3268C131.669 67.3911 132.447 67.1211 133.025 67.3589C134.066 67.7896 135.14 68.3552 135.93 69.1329C136.451 69.6535 136.907 69.5956 137.447 69.6406C137.582 69.6535 137.717 69.6278 137.993 69.6085C137.608 71.0289 137.299 72.3593 136.875 73.6576C136.592 74.5253 136.239 74.6153 135.564 74.0047C134.895 73.4005 134.124 73.2527 133.301 73.0985C132.459 72.9442 131.637 72.6871 130.808 72.4622C129.786 72.1858 128.783 71.813 127.748 71.6523C126.771 71.4981 125.743 71.6523 124.76 71.5109C123.937 71.3952 123.127 71.106 122.343 70.8039C121.932 70.6433 121.604 70.3412 121.739 69.7434C122.073 68.2652 122.343 66.7741 122.651 65.2315L122.639 65.2444ZM220.41 77.0448C220.442 76.9484 220.48 76.852 220.512 76.7556C221.785 77.0319 223.193 77.0576 224.298 77.6425C225.693 78.3816 227.216 79.1529 227.717 80.9718C228.013 82.0516 227.698 82.8743 227.12 83.8769C226.985 83.517 226.901 83.292 226.817 83.0671C226.644 82.6172 226.567 82.0709 226.271 81.7366C225.834 81.2482 225.211 80.9268 224.709 80.4833C223.662 79.5514 222.665 78.568 221.611 77.6489C221.284 77.3661 220.821 77.2376 220.422 77.0384L220.41 77.0448ZM174.873 81.5567C174.731 81.4988 174.481 81.4667 174.326 81.3253C173.896 80.9397 173.542 80.4641 173.092 80.1106C172.07 79.3007 171.736 78.3945 172.141 77.2569C172.186 77.1219 172.334 77.0255 172.437 76.9162C172.424 76.9998 172.405 77.0833 172.392 77.1669C172.713 77.379 173.047 77.5718 173.349 77.8096C173.568 77.9832 173.819 78.1888 173.909 78.4395C174.249 79.4164 174.526 80.4126 174.873 81.5631V81.5567ZM168.478 65.6879C168.4 65.7136 168.323 65.7393 168.253 65.7586C167.848 65.585 167.436 65.2637 167.031 65.2637C166.003 65.2637 165.54 64.7752 165.791 63.7983C165.849 63.5669 165.81 63.3034 165.849 63.0656C165.887 62.8149 165.971 62.5642 166.035 62.3136C166.299 62.4228 166.639 62.4614 166.806 62.6542C167.147 63.0527 167.411 63.5155 167.661 63.9782C167.963 64.531 168.214 65.1158 168.484 65.6814L168.478 65.6879ZM214.844 93.4599C214.882 93.5692 214.921 93.6784 214.959 93.7877C214.227 94.1541 213.462 94.4754 212.768 94.8996C212.022 95.3495 211.231 95.658 210.389 95.5102C209.965 95.4331 209.303 95.3945 209.149 94.8032C211.109 94.3469 212.973 93.9034 214.844 93.4663V93.4599ZM210.775 84.2176C212.849 84.1533 214.049 84.2797 214.374 84.5968C214.124 84.7317 213.834 84.8089 213.674 84.9952C213.025 85.7537 212.453 85.9979 211.636 85.1302C211.366 84.8474 210.788 84.8474 210.775 84.2111V84.2176ZM187.001 81.2932C187.091 81.351 187.329 81.4217 187.406 81.576C187.541 81.8523 187.573 82.1737 187.65 82.4758C187.386 82.5401 187.078 82.72 186.879 82.6365C185.947 82.2637 185.034 81.8395 184.134 81.3832C183.935 81.2803 183.839 80.9782 183.697 80.7661C183.768 80.7019 183.845 80.6312 183.916 80.5669C184.565 80.9525 185.201 81.3703 185.876 81.7109C186.114 81.8331 186.448 81.8138 186.724 81.7559C186.84 81.7366 186.904 81.4603 187.001 81.2868V81.2932ZM179.796 75.0909C178.787 75.303 177.778 75.5087 176.717 75.7272C176.775 75.0395 177.283 74.7567 177.758 74.4225C178.703 73.7669 179.076 74.9366 179.796 75.0909ZM156.999 68.8372C157.423 69.782 157.834 70.7204 158.252 71.6523C157.146 71.1574 156.729 70.0584 156.999 68.8372ZM166.774 68.7601C166.022 68.5287 165.444 68.3552 164.743 68.1366C165.527 67.6225 166.151 67.8153 166.774 68.7601ZM183.408 80.2841C183.337 80.3998 183.267 80.5091 183.189 80.6247C182.804 80.3484 182.425 80.0784 182.039 79.8021C182.09 79.7249 182.142 79.6542 182.193 79.5771C182.598 79.8149 183.003 80.0463 183.408 80.2841ZM155.572 74.1075L155.765 73.8312C156.214 74.1397 156.664 74.4417 157.114 74.7503C157.056 74.8402 156.999 74.9238 156.941 75.0138C156.484 74.7117 156.028 74.416 155.572 74.114V74.1075ZM162.32 60.8289L162.442 60.9381C162.095 61.3174 161.748 61.6901 161.401 62.0693C161.356 62.0308 161.311 61.9858 161.266 61.9472L162.32 60.8289Z" fill="black"/>
          <path d="M9.36 20.68C9.30667 18.84 9.24 17.8533 9.16 17.72C9.08 17.5867 8.88 17.52 8.56 17.52C7.97333 17.52 7.48 17.68 7.08 18C5.77333 18.9333 5.08 20.2533 5 21.96L4.96 23.48L5.84 23.64C6.64 23.7467 7.10667 23.8 7.24 23.8C7.53333 23.8 7.97333 23.7333 8.56 23.6L9.4 23.4L9.36 20.68ZM10.08 2.08C10.4 1.97333 10.7733 1.92 11.2 1.92H11.44C11.84 1.94667 12.1067 2.01333 12.24 2.12C12.3733 2.22667 12.5067 2.49333 12.64 2.92C12.88 3.56 13.0267 4.61333 13.08 6.08C13.2133 9.14667 13.3333 10.7467 13.44 10.88C13.5733 11.12 13.72 11.9867 13.88 13.48C14.0667 14.9733 14.1733 16.48 14.2 18C14.28 20.32 14.5067 22.0667 14.88 23.24C15.2267 24.4133 15.4 25.24 15.4 25.72C15.4 26.36 15.2 26.68 14.8 26.68C14.56 26.68 14.36 26.7867 14.2 27C13.9067 27.24 13.5067 27.4 13 27.48C12.68 27.5333 12.4933 27.56 12.44 27.56C12.1467 27.56 11.8133 27.3733 11.44 27C11.0933 26.6533 10.8133 26.48 10.6 26.48C10.4933 26.48 10.36 26.52 10.2 26.6C9.56 26.8933 8.56 27.04 7.2 27.04C6.32 27.04 5.49333 26.9867 4.72 26.88C3.68 26.7733 2.98667 26.6667 2.64 26.56C2.32 26.4533 1.97333 26.2267 1.6 25.88C1.2 25.48 0.866667 24.9333 0.6 24.24C0.333333 23.5467 0.2 22.88 0.2 22.24C0.2 21.9733 0.213333 21.7867 0.24 21.68C0.56 19.7067 1.05333 18.2667 1.72 17.36C2.09333 16.8267 2.28 16.4933 2.28 16.36C2.28 16.2 2.50667 15.8933 2.96 15.44C3.41333 14.96 4.32 14.5733 5.68 14.28C6.77333 14.0933 7.66667 13.84 8.36 13.52C8.73333 13.3333 8.92 13.04 8.92 12.64C8.92 12.16 8.78667 11.04 8.52 9.28C8.44 8.58667 8.4 7.90667 8.4 7.24C8.4 5.93333 8.54667 4.8 8.84 3.84C9.16 2.85333 9.57333 2.26667 10.08 2.08ZM29.5303 8.76C29.4236 8.41333 29.3036 8.18667 29.1703 8.08C29.0636 7.94667 28.877 7.88 28.6103 7.88C27.8103 7.93333 27.157 8.44 26.6503 9.4C26.357 9.93333 26.0103 10.4267 25.6103 10.88C25.1836 11.3333 24.957 12.0933 24.9303 13.16V14.44C24.9303 15.5867 25.0903 16.16 25.4103 16.16C25.677 16.16 26.117 15.9733 26.7303 15.6C27.2903 15.28 27.6903 14.9867 27.9303 14.72C28.1703 14.4267 28.4636 13.96 28.8103 13.32C29.4236 12.04 29.7303 10.9333 29.7303 10C29.7303 9.62667 29.6636 9.21333 29.5303 8.76ZM27.1303 5.36C27.5303 5.17333 28.1303 5.08 28.9303 5.08C29.7036 5.08 30.397 5.17333 31.0103 5.36C31.6503 5.52 31.9703 5.72 31.9703 5.96C31.9703 6.12 32.237 6.32 32.7703 6.56C33.9703 7.04 34.5836 8.13333 34.6103 9.84V10.4C34.6103 11.44 34.477 12.2667 34.2103 12.88C33.9703 13.4933 33.5036 14.1733 32.8103 14.92C31.9303 15.8533 31.4103 16.32 31.2503 16.32C31.0903 16.32 30.157 16.7333 28.4503 17.56C26.7436 18.3867 25.8903 18.9867 25.8903 19.36C25.8903 19.52 26.0103 19.72 26.2503 19.96C26.3036 20.0133 26.4236 20.2267 26.6103 20.6C26.8236 20.9733 27.037 21.32 27.2503 21.64C27.4903 21.9333 27.6903 22.08 27.8503 22.08C27.957 22.1067 28.2236 22.2 28.6503 22.36C29.077 22.52 29.4103 22.6 29.6503 22.6C29.8103 22.6 29.9303 22.5867 30.0103 22.56C30.2236 22.5067 30.3703 22.48 30.4503 22.48C31.1436 22.48 31.6903 22.8667 32.0903 23.64C32.2236 23.9067 32.2903 24.1333 32.2903 24.32C32.2903 24.8533 31.997 25.1867 31.4103 25.32C30.4503 25.5867 29.1036 25.76 27.3703 25.84C27.237 25.84 27.0636 25.8533 26.8503 25.88C26.637 25.88 26.4903 25.88 26.4103 25.88C25.6903 25.88 25.037 25.6933 24.4503 25.32C23.8903 24.9467 23.4236 24.4933 23.0503 23.96C22.7036 23.4267 22.157 22.4 21.4103 20.88C20.8503 19.76 20.4903 18.9333 20.3303 18.4C20.197 17.8667 20.077 17.0533 19.9703 15.96C19.8103 14.4933 19.7303 13.5067 19.7303 13C19.7303 12.52 19.8503 11.8533 20.0903 11C20.437 9.77333 21.2103 8.57333 22.4103 7.4C23.6103 6.2 24.637 5.6 25.4903 5.6C25.517 5.6 25.557 5.61333 25.6103 5.64C25.6636 5.64 25.7036 5.64 25.7303 5.64H25.8503C26.2503 5.64 26.677 5.54667 27.1303 5.36ZM40.9081 0.839999C41.1481 0.733332 41.3615 0.679998 41.5481 0.679998C41.7081 0.679998 41.9881 0.719999 42.3881 0.799999C42.9748 0.906666 43.3615 1.29333 43.5481 1.96C43.7348 2.62666 43.8548 4.05333 43.9081 6.24C43.9881 9.81333 44.3215 12.4933 44.9081 14.28C45.2815 15.4 45.5215 16.3333 45.6281 17.08C45.7348 17.8 45.8148 18.9467 45.8681 20.52C45.8948 21.1333 45.9748 23.2267 46.1081 26.8C46.1615 27.5467 46.1881 28.5733 46.1881 29.88C46.1881 30.7067 46.1748 31.1867 46.1481 31.32C46.0681 31.6933 45.9348 31.9467 45.7481 32.08C45.5881 32.24 45.1615 32.44 44.4681 32.68C43.4281 33.0267 42.7481 33.2 42.4281 33.2C42.0815 33.2 41.7881 33.0133 41.5481 32.64C41.3348 32.2933 41.2281 31.84 41.2281 31.28C41.2281 31.2267 41.2281 31.1467 41.2281 31.04C41.2548 30.9333 41.2681 30.8533 41.2681 30.8V30.16C41.2681 29.2 41.2281 28.2267 41.1481 27.24C40.9881 25.56 40.8415 23.36 40.7081 20.64C40.5481 17.7867 40.4015 16.2133 40.2681 15.92C39.9748 15.36 39.6415 14.04 39.2681 11.96C39.1081 10.92 39.0281 9.37333 39.0281 7.32C39.0281 5.10667 39.1081 3.72 39.2681 3.16C39.6948 1.90667 40.2415 1.13333 40.9081 0.839999ZM60.2725 8.76C60.1658 8.41333 60.0458 8.18667 59.9125 8.08C59.8058 7.94667 59.6192 7.88 59.3525 7.88C58.5525 7.93333 57.8992 8.44 57.3925 9.4C57.0992 9.93333 56.7525 10.4267 56.3525 10.88C55.9258 11.3333 55.6992 12.0933 55.6725 13.16V14.44C55.6725 15.5867 55.8325 16.16 56.1525 16.16C56.4192 16.16 56.8592 15.9733 57.4725 15.6C58.0325 15.28 58.4325 14.9867 58.6725 14.72C58.9125 14.4267 59.2058 13.96 59.5525 13.32C60.1658 12.04 60.4725 10.9333 60.4725 10C60.4725 9.62667 60.4058 9.21333 60.2725 8.76ZM57.8725 5.36C58.2725 5.17333 58.8725 5.08 59.6725 5.08C60.4458 5.08 61.1392 5.17333 61.7525 5.36C62.3925 5.52 62.7125 5.72 62.7125 5.96C62.7125 6.12 62.9792 6.32 63.5125 6.56C64.7125 7.04 65.3258 8.13333 65.3525 9.84V10.4C65.3525 11.44 65.2192 12.2667 64.9525 12.88C64.7125 13.4933 64.2458 14.1733 63.5525 14.92C62.6725 15.8533 62.1525 16.32 61.9925 16.32C61.8325 16.32 60.8992 16.7333 59.1925 17.56C57.4858 18.3867 56.6325 18.9867 56.6325 19.36C56.6325 19.52 56.7525 19.72 56.9925 19.96C57.0458 20.0133 57.1658 20.2267 57.3525 20.6C57.5658 20.9733 57.7792 21.32 57.9925 21.64C58.2325 21.9333 58.4325 22.08 58.5925 22.08C58.6992 22.1067 58.9658 22.2 59.3925 22.36C59.8192 22.52 60.1525 22.6 60.3925 22.6C60.5525 22.6 60.6725 22.5867 60.7525 22.56C60.9658 22.5067 61.1125 22.48 61.1925 22.48C61.8858 22.48 62.4325 22.8667 62.8325 23.64C62.9658 23.9067 63.0325 24.1333 63.0325 24.32C63.0325 24.8533 62.7392 25.1867 62.1525 25.32C61.1925 25.5867 59.8458 25.76 58.1125 25.84C57.9792 25.84 57.8058 25.8533 57.5925 25.88C57.3792 25.88 57.2325 25.88 57.1525 25.88C56.4325 25.88 55.7792 25.6933 55.1925 25.32C54.6325 24.9467 54.1658 24.4933 53.7925 23.96C53.4458 23.4267 52.8992 22.4 52.1525 20.88C51.5925 19.76 51.2325 18.9333 51.0725 18.4C50.9392 17.8667 50.8192 17.0533 50.7125 15.96C50.5525 14.4933 50.4725 13.5067 50.4725 13C50.4725 12.52 50.5925 11.8533 50.8325 11C51.1792 9.77333 51.9525 8.57333 53.1525 7.4C54.3525 6.2 55.3792 5.6 56.2325 5.6C56.2592 5.6 56.2992 5.61333 56.3525 5.64C56.4058 5.64 56.4458 5.64 56.4725 5.64H56.5925C56.9925 5.64 57.4192 5.54667 57.8725 5.36ZM82.7303 13.68C82.8903 13.68 83.037 13.84 83.1703 14.16C83.3303 14.48 83.477 14.64 83.6103 14.64C83.7436 14.64 83.9303 14.92 84.1703 15.48C84.4103 16.0667 84.5303 17.3467 84.5303 19.32C84.5303 20.5733 84.4636 21.32 84.3303 21.56C84.277 21.6667 84.117 22.5067 83.8503 24.08C83.5836 25.6267 83.4103 26.4533 83.3303 26.56C83.1703 26.7733 83.1436 27 83.2503 27.24V27.28C83.277 27.3333 83.2903 27.3733 83.2903 27.4C83.2903 27.6933 83.197 28.0533 83.0103 28.48C82.6903 29.12 82.4903 29.7333 82.4103 30.32C82.3303 30.7733 82.237 31.0667 82.1303 31.2C82.0236 31.3333 81.7703 31.4533 81.3703 31.56C81.2103 31.6133 80.957 31.64 80.6103 31.64C80.1836 31.64 79.6903 31.56 79.1303 31.4C78.5436 31.2133 78.1303 31.0267 77.8903 30.84C77.677 30.68 77.5703 30.4 77.5703 30C77.5703 29.6533 77.8103 28.6267 78.2903 26.92C78.397 26.6 78.557 25.8133 78.7703 24.56C78.9836 23.3067 79.157 22.52 79.2903 22.2C79.557 21.4 79.6903 20.0933 79.6903 18.28C79.6903 17.3733 79.637 16.8133 79.5303 16.6C79.397 16.3333 79.0236 16.1067 78.4103 15.92C77.8236 15.7067 77.2503 15.6 76.6903 15.6C76.1303 15.6 75.8103 15.7067 75.7303 15.92C75.677 16.0533 75.5303 17.3067 75.2903 19.68C75.2636 20 75.117 21.0667 74.8503 22.88C74.5836 24.6667 74.4503 25.8 74.4503 26.28C74.4236 27.0267 74.2503 27.52 73.9303 27.76C73.6103 28 72.9703 28.12 72.0103 28.12C71.2903 28.12 70.8103 28.0933 70.5703 28.04C70.357 27.96 70.1703 27.8133 70.0103 27.6C69.7436 27.2 69.6103 26.4667 69.6103 25.4C69.6103 24.3067 69.757 22.9867 70.0503 21.44C70.3703 19.68 70.5303 17.7467 70.5303 15.64C70.5303 13.6133 70.397 12.0533 70.1303 10.96C69.8903 10.0533 69.7703 9.33333 69.7703 8.8C69.7703 8.16 69.9836 7.64 70.4103 7.24C70.7036 6.94667 71.197 6.8 71.8903 6.8C72.797 6.8 73.4636 7.01333 73.8903 7.44C74.157 7.70667 74.477 8.30667 74.8503 9.24C75.2236 10.1467 75.4103 10.8133 75.4103 11.24C75.4103 11.5867 75.557 11.8133 75.8503 11.92C76.1703 12.0267 76.9303 12.1333 78.1303 12.24C79.4903 12.3733 80.557 12.6533 81.3303 13.08C82.0236 13.48 82.4903 13.68 82.7303 13.68ZM92.8309 0.999999C93.3643 0.893332 93.6976 0.839999 93.8309 0.839999C94.2576 0.839999 94.5776 0.973332 94.7909 1.24C95.0043 1.50666 95.1509 1.94666 95.2309 2.56C95.3643 3.57333 95.4309 5.12 95.4309 7.2C95.4309 10.9867 95.2976 13.48 95.0309 14.68C94.8176 15.6933 94.6043 17.0533 94.3909 18.76C94.2043 20.3333 93.9109 21.32 93.5109 21.72C93.1109 22.0667 92.6309 22.24 92.0709 22.24C91.5109 22.24 91.0709 22.0933 90.7509 21.8C90.3243 21.48 89.9509 21.28 89.6309 21.2C89.4176 21.12 89.2709 21.0133 89.1909 20.88C89.1376 20.72 89.1109 20.4533 89.1109 20.08C89.1109 19.3333 89.1909 18.64 89.3509 18C90.0176 14.6667 90.3643 10.9733 90.3909 6.92C90.4443 3.66666 90.4976 2.01333 90.5509 1.96C91.1109 1.58667 91.8709 1.26667 92.8309 0.999999ZM89.7109 26.96C90.3243 26.4 90.8443 26.12 91.2709 26.12C91.6709 26.12 92.0443 26.2667 92.3909 26.56C92.7643 26.8533 92.9509 27.16 92.9509 27.48C92.9509 27.8 93.1109 28.1467 93.4309 28.52C93.7243 28.8933 93.8709 29.2533 93.8709 29.6C93.8709 29.92 93.7776 30.3067 93.5909 30.76C93.1643 31.7733 92.2843 32.28 90.9509 32.28C90.7109 32.28 90.5243 32.2667 90.3909 32.24L89.3509 32.08L89.3909 30.68V30.36C89.3909 29.5867 89.3109 29.12 89.1509 28.96C88.9643 28.7733 88.8709 28.5733 88.8709 28.36C88.8709 27.9867 89.1509 27.52 89.7109 26.96Z" fill="black"/>
        </svg>
      </div>
    </Layout>
    </div>
  )
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("project", {
    predicates: [prismic.filter.not("my.project.uid", "home")],
  });

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
