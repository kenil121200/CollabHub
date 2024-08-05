import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AvatarContainer,
  Button,
  ButtonHolder,
  Header,
  HeaderAndValue,
  Options,
  OwnerContainer,
  OwnerName,
  PageContainer,
  ProjectContainer,
  ProjectInfo,
  Skills,
  SkillsContainer,
  Title,
  TopBar,
  TopbarLeft,
  TopRight,
  ToprightOption,
  Value,
} from "./ProjectDescriptionStyles";

const ProjectDescription = () => {
  const location = useLocation();
  const { project } = location.state; // Get project from location state
  console.log("project", project);
  const [openRequestToJoin, setOpenRequestToJoin] = useState(false);
  const [isSendWithMessageChecked, setIsSendWithMessageChecked] =
    useState(false);
  const [message, setMessage] = useState("");
  const [skillsArray, setSkillsArray] = useState([]);
  const [isContributor, setIsContributor] = useState(false);
  useEffect(() => {
    const currentUser = localStorage.getItem("email");
    setIsContributor(project.contributorsEmail.includes(currentUser));
  }, [project]);
  const isRequestPending = project.pendingRequestList.includes(
    localStorage.getItem("email")
  );

  useEffect(() => {
    if (project.projectTechnologies) {
      setSkillsArray(
        project.projectTechnologies
          .split(",")
          .map((skill: string) => skill.trim())
      );
    }
  }, [project.skills]);

  const handleSendRequest = async () => {
    try {
      const userEmail = localStorage.getItem("email"); // Get the user email from localStorage
      if (!userEmail) {
        alert("User email not found. Please log in.");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/join-project/join`,
        {
          projectId: project._id,
          userEmail: userEmail,
        }
      );

      if (response.status === 200) {
        console.log(response);
        alert("Request sent successfully!");
      } else {
        alert("Failed to send request.");
      }
    } catch (error) {
      console.error("Error sending join request:", error);
      alert("Failed to send request.");
    }
  };

  return (
    <>
      <PageContainer>
        <ProjectContainer>
          <ProjectInfo>
            <HeaderAndValue>
              <Header>Project Name</Header>
              <Value>{project.projectName}</Value>
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Project Owner</Header>
              <OwnerContainer>
                <AvatarContainer>
                  <img
                    src={
                      "https://static.vecteezy.com/system/resources/previews/024/183/535/original/male-avatar-portrait-of-a-young-man-with-glasses-illustration-of-male-character-in-modern-color-style-vector.jpg"
                    }
                    height={40}
                    width={40}
                    alt="Owner Avatar"
                  />
                </AvatarContainer>
                <OwnerName>{project.createdByEmail}</OwnerName>
              </OwnerContainer>
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Project Description</Header>
              <Value>{project.projectDescription}</Value>
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Skills Required</Header>
              <SkillsContainer>
                {skillsArray.map((skill: String) => (
                  <Skills>{skill}</Skills>
                ))}
              </SkillsContainer>
            </HeaderAndValue>
            <ButtonHolder>
              {isContributor ? (
                <>You have already joined this project</>
              ) : isRequestPending ? (
                <Button disabled>Request already sent</Button>
              ) : (
                <Button onClick={() => handleSendRequest()}>
                  Request to join
                </Button>
              )}
            </ButtonHolder>
          </ProjectInfo>
        </ProjectContainer>
      </PageContainer>
    </>
  );
};

export default ProjectDescription;
