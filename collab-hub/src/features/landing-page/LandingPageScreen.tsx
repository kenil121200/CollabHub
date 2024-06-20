import Landigpage from "../../components/ui-components/landing-page/Landigpage";
import {
  Header,
  InfoContainer,
  LeftOverlay,
  // Logo,
  // LogoContainer,
  LogoImage,
  LogosContainer,
  LogosSlide,
  Main,
  RightOverlay,
  // Slider,
  // SliderTrack,
} from "./LandingPageStyles";
import Typewriter from "typewriter-effect";
import { useEffect, useRef } from "react";

const LandingPage: React.FC = () => {
  const sliderTrackRef = useRef(null);

  const logos = [
    {
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png",
    },
    {
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png",
    },
    {
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png",
    },
    {
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png",
    },
    {
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png",
    },
    {
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png",
    },
    {
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png",
    },
    {
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png",
    },
    {
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png",
    },
    {
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png",
    },
  ];
  return (
    <>
      <Main>
        <InfoContainer>
          <Header>
            <Typewriter
              options={{
                strings: [
                  "Discover open source projects on GitHub that match your skills and interests for meaningful contributions.",
                  "Connect with like-minded developers to share ideas and work together on impactful open source projects.",
                  "Utilize advanced algorithms to pair your expertise with projects that need your specific skills.",
                  "Help project maintainers attract skilled contributors and enhance their project's reach within the open source community.",
                ],
                autoStart: true,
                loop: true,
                delay: 20, // Decrease the delay between each character
                deleteSpeed: 0,
              }}
            />
          </Header>
        </InfoContainer>
        <Landigpage />
      </Main>
      {/* <Slider>
        <SliderTrack>
          <LogoContainer>
            {logos.map((logo) => (
              <Logo>
                <img src={logo.logo} height={"100%"} width={"100%"} />
              </Logo>
            ))}
          </LogoContainer>

          <LogoContainer>
            {logos.map((logo) => (
              <div className="image">
                <img src={logo.logo} height={"100%"} width={"100%"} />
              </div>
            ))}
          </LogoContainer>
        </SliderTrack>
      </Slider> */}

      <LogosContainer>
        <LeftOverlay />
        <RightOverlay />
        <LogosSlide>
          {/* Add your logo images here */}
          <LogoImage
            src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png"
            alt="Logo 1"
          />
          <LogoImage
            src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png"
            alt="Logo 2"
          />
          <LogoImage
            src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png"
            alt="Logo 2"
          />
          <LogoImage
            src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png"
            alt="Logo 2"
          />
          <LogoImage
            src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png"
            alt="Logo 2"
          />
          <LogoImage
            src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png"
            alt="Logo 2"
          />
          <LogoImage
            src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png"
            alt="Logo 2"
          />
          <LogoImage
            src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png"
            alt="Logo 2"
          />
          <LogoImage
            src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png"
            alt="Logo 2"
          />
          <LogoImage
            src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png"
            alt="Logo 2"
          />
          <LogoImage
            src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png"
            alt="Logo 2"
          />
          {/* ... */}
        </LogosSlide>
      </LogosContainer>
    </>
  );
};

export default LandingPage;
