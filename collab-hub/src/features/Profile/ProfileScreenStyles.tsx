import styled, { keyframes } from "styled-components";
import { FaEdit } from "react-icons/fa";

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PageContainer = styled.div`
  //   background-color: #0f1a24;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  //   background-color: #0F1A24;
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #e5e8eb;
  z-index: 1000;
`;

export const TopbarLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const Title = styled.div`
  font-family: Inter, sans-serif;
  color: white;
  font-weight: 600;
  font-size: 28px;
  line-height: 40px;
`;

export const ProjectContainer = styled.div`
  margin-top: 60px;
  padding: 24px;
  background-color: white;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 75px;
  width: 100%;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
`;

export const EditButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0a6ed6;
  padding: 8px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-top: 12px;
  width: 100%;

  &:hover {
    background-color: #191d88;
  }

  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const HeaderAndValue = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const Header = styled.div`
  font-family: Inter, sans-serif;
  color: #0f1a24;
  font-weight: 600;
  font-size: 24px;
  line-height: 40px;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 32px;
  }
`;

export const Value = styled.div`
  margin-top: 8px;
  font-family: Inter, sans-serif;
  color: #8fabcc;
  font-weight: 400;
  line-height: 24px;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

export const OwnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 24px;
`;

export const AvatarContainer = styled.div`
  height: 120px;
  width: 120px;
  overflow: hidden;
  border-radius: 50%;
  position: relative;

  &:hover .edit-icon {
    display: block;
  }
`;

export const EditIcon = styled(FaEdit)`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #0a6ed6;
  color: white;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  display: none;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 16px;
  margin-bottom: 12px;
  width: 55%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Skills = styled.div`
  padding: 6px;
  border-radius: 4px;
  background-color: #21364a;
  font-family: Inter, sans-serif;
  color: #8fabcc;
  font-weight: 400;
  line-height: 24px;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

export const ButtonHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;
