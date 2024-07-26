import Landigpage from "../../components/ui-components/landing-page/Landigpage";
import {
  DetailsContsiner,
  FooterContainer,
  Header,
  InfoContainer,
  LeftOverlay,
  LogoImage,
  LogosContainer,
  LogosSlide,
  Main,
  RightOverlay,
  Title,
  Text,
  FollowUsContainer,
  FollowIcons,
  Icons,
} from "./LandingPageStyles";
import Typewriter from "typewriter-effect";
import { useRef } from "react";

const LandingPage: React.FC = () => {
  const sliderTrackRef = useRef(null);

  const logos = [
    {
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png",
    },
    {
      logo: "https://www.svgrepo.com/show/303360/nodejs-logo.svg",
    },
    {
      logo: "https://cdn0.iconfinder.com/data/icons/logos-brands-in-colors/128/react-512.png",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png",
    },
    {
      logo: "https://static-00.iconduck.com/assets.00/next-js-icon-2048x2048-5dqjgeku.png",
    },
    {
      logo: "https://www.php.net/images/logos/new-php-logo.svg",
    },
    {
      logo: "https://www.svgrepo.com/show/376344/python.svg",
    },
    {
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    },
    {
      logo: "https://www.svgrepo.com/show/303251/mysql-logo.svg",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Firebase_icon.svg/2048px-Firebase_icon.svg.png",
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
          {logos.map((logo) => {
            return <LogoImage src={logo.logo} alt="Logo 1" />;
          })}
          {logos.map((logo) => {
            return <LogoImage src={logo.logo} alt="Logo 1" />;
          })}
          {logos.map((logo) => {
            return <LogoImage src={logo.logo} alt="Logo 1" />;
          })}
        </LogosSlide>
      </LogosContainer>
      <FooterContainer>
        <DetailsContsiner>
          <Title>CollabHub</Title>
          <Text>
            Discover open source projects on GitHub that match your skills and
            interests for meaningful contributions.
          </Text>
          <FollowUsContainer>
            <Text>Follow Us:</Text>
            <FollowIcons>
              <Icons>
                <img
                  src="https://www.svgrepo.com/show/125065/twitter-social-logotype.svg"
                  height={"30px"}
                  width={"30px"}
                />
              </Icons>
              <Icons>
                <img
                  src="https://www.svgrepo.com/show/75731/youtube.svg"
                  height={"30px"}
                  width={"30px"}
                />
              </Icons>
              <Icons>
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/alibaba-cloud-ui-icon-library/linkedin-124.png"
                  height={"30px"}
                  width={"30px"}
                />
              </Icons>
            </FollowIcons>
          </FollowUsContainer>
        </DetailsContsiner>
      </FooterContainer>
    </>
  );
};

export default LandingPage;
