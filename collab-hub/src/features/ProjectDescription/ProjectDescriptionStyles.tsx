import styled from "styled-components";
import { Typography } from "@mui/material";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
`;

export const TopbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const TopRight = styled.div`
  display: flex;
  align-items: center;
`;

export const ToprightOption = styled.div`
  margin-left: 20px;
`;

export const Options = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ProjectContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderAndValue = styled.div`
  margin-bottom: 20px;
`;

export const Header = styled(Typography).attrs({ variant: "h6" })`
  font-weight: bold;
`;

export const Value = styled(Typography)`
  margin-top: 5px;
`;

export const OwnerContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarContainer = styled.div`
  margin-right: 10px;

  img {
    border-radius: 50%;
  }
`;

export const OwnerName = styled(Typography).attrs({ variant: "body1" })`
  font-weight: bold;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Skills = styled.div`
  padding: 5px 10px;
  background-color: #282c34;
  color: white;
  border-radius: 5px;
  font-size: 14px;
`;

export const ButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #21a1f1;
  }
`;

export const RequestToJoinModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const InstructionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const MessageQuestionContainer = styled(Typography).attrs({
  variant: "body1",
})`
  margin-left: 10px;
`;

export const RequestWithMessage = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

export const SuccessErrorModal = styled.div`
  // styles for the modal
`;
