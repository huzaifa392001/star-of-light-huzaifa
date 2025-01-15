import ContentSection from "@/components/innerpage/ContentSection/ContentSection";
import InnerHero from "@/components/innerpage/InnerHero/InnerHero";
import SubHeading from "@/components/innerpage/SubHeading/SubHeading";
import VideoSection from "@/components/innerpage/VideoSection/VideoSection";
import Wrapper from "@/components/innerpage/Wrapper/Wrapper";

export default function Index() {
  return (
    <Wrapper>
      <InnerHero heading={["Bauhaus", "Tapete"]} />
      <SubHeading
        subHeading={
          "Welcome to Bauhaustapete, the ultimate destination for anyone looking for stunning and high-quality Bauhaus wallpaper. The website has been designed to provide a seamless and enjoyable shopping experience."
        }
      />
      <ContentSection
        logo={"/work/bauhas/logo.png"}
        description={[
          "Bauhaus Wallpaper: Celebrating the Iconic Style of the Modernist Movement.Bauhaus, the art school that revolutionized the design world in the 1920s and 30s, is celebrated for its commitment to modernism, simplicity, and functionality.",
          "Today, this iconic style continues to inspire designers and enthusiasts alike, and is now available in the form of Bauhaus wallpaper.",
        ]}
        image={"/work/bauhas/img1.jpg"}
      />
      <VideoSection video="" poster="/work/bauhas/poster.jpg" />
    </Wrapper>
  );
}
