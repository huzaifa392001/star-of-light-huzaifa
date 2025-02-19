import Footer from "@/components/Footer/Footer";
import ContentSection from "@/components/innerpage/ContentSection/ContentSection";
import HeadingSection from "@/components/innerpage/HeadingSection/HeadingSection";
import ImageSection from "@/components/innerpage/ImageSection/ImageSection";
import InnerHero from "@/components/innerpage/InnerHero/InnerHero";
import MobileSection from "@/components/innerpage/MobileSection/MobileSection";
import NextPrevSection from "@/components/innerpage/NextPrevSection/NextPrevSection";
import SubHeading from "@/components/innerpage/SubHeading/SubHeading";
import TileSection from "@/components/innerpage/TileSection/TileSection";
import VideoSection from "@/components/innerpage/VideoSection/VideoSection";
import Wrapper from "@/components/innerpage/Wrapper/Wrapper";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Bauhas Tapate - Philippe Layani</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <InnerHero heading={["Bauhaus", "Tapete"]} />
        <SubHeading
          subHeading={
            "Welcome to Bauhaustapete, the ultimate destination for anyone looking for stunning and high-quality Bauhaus wallpaper. The website has been designed to provide a seamless and enjoyable shopping experience."
          }
        />
        <ContentSection
          logo={"/work/bauhas/logo.webp"}
          description={[
            "Bauhaus Wallpaper: Celebrating the Iconic Style of the Modernist Movement.Bauhaus, the art school that revolutionized the design world in the 1920s and 30s, is celebrated for its commitment to modernism, simplicity, and functionality.",
            "Today, this iconic style continues to inspire designers and enthusiasts alike, and is now available in the form of Bauhaus wallpaper.",
          ]}
          image={"/work/bauhas/img1.webp"}
        />
        <VideoSection video="" poster="/work/bauhas/poster.webp" />
        <ImageSection image="/work/bauhas/webpage1.webp" />
        <HeadingSection
          heading="Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet"
          image="/work/bauhas/headingImage1.webp"
        />
        <ContentSection
          type=""
          description={[
            "The Bauhaus wallpaper collection captures the spirit of the movement, with its clean lines, bold shapes, and striking colors. Each design in the collection is a modern interpretation of the classic Bauhaus style, featuring geometric shapes and abstract patterns that reflect the movement’s commitment to simplicity and functionality.",
            "The wallpaper is available in a range of colors and patterns, from monochromatic designs to bold and colorful compositions that make a statement. Whether you’re looking for a subtle accent wall or a bold statement piece, there is a Bauhaus wallpaper design that will suit your needs.",
          ]}
          image={"/work/bauhas/img2.webp"}
          minDescription
          leftImg
        />
        <ImageSection
          image="/work/bauhas/webpage2.webp"
          type="withBg"
          backgroundImage={"/work/bauhas/webpageBg.webp"}
        />
        <SubHeading
          subHeading={
            "Welcome to Bauhaustapete, the ultimate destination for anyone looking for stunning and high-quality Bauhaus wallpaper. The website has been designed to provide a seamless and enjoyable shopping experience."
          }
        />
        <ContentSection
          type=""
          description={[
            "The Bauhaus wallpaper collection captures the spirit of the movement, with its clean lines, bold shapes, and striking colors. Each design in the collection is a modern interpretation of the classic Bauhaus style, featuring geometric shapes and abstract patterns that reflect the movement’s commitment to simplicity and functionality.",
            "The wallpaper is available in a range of colors and patterns, from monochromatic designs to bold and colorful compositions that make a statement. Whether you’re looking for a subtle accent wall or a bold statement piece, there is a Bauhaus wallpaper design that will suit your needs.",
          ]}
          image={"/work/bauhas/img3.webp"}
          minDescription
        />
        {/* <ImageSection image="/work/bauhas/webpage3.webp" type="fullImg" /> */}
        <TileSection
          images={[
            "/work/bauhas/tiles/1.webp",
            "/work/bauhas/tiles/2.webp",
            "/work/bauhas/tiles/3.webp",
            "/work/bauhas/tiles/4.webp",
            "/work/bauhas/tiles/5.webp",
            "/work/bauhas/tiles/6.webp",
            "/work/bauhas/tiles/7.webp",
            "/work/bauhas/tiles/8.webp",
          ]}
        />
        <MobileSection
          images={[
            "/work/bauhas/mobile1.webp",
            "/work/bauhas/mobile2.webp",
            "/work/bauhas/mobile3.webp",
          ]}
        />
        <ImageSection
          doubleImg={["/work/bauhas/img4.webp", "/work/bauhas/img5.webp"]}
          type="doubleImg"
        />
        <ImageSection
          doubleImg={[
            "/work/bauhas/fullweb1.webp",
            "/work/bauhas/fullweb2.webp",
          ]}
          type="doubleFullImg"
        />
        <HeadingSection
          heading="Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet"
          image="/work/bauhas/headingImage2.webp"
        />
        <NextPrevSection />
      </Wrapper>
      <Footer />
    </>
  );
}
