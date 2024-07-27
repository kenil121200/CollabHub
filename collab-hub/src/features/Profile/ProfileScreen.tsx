import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import {
  Avatar,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  AvatarContainer,
  ButtonHolder,
  EditButton,
  EditIcon,
  Header,
  HeaderAndValue,
  PageContainer,
  ProfileDetails,
  ProfileSection,
  ProjectContainer,
  ProjectInfo,
  Skills,
  SkillsContainer,
  Title,
  TopBar,
  TopbarLeft,
  Value,
} from "./ProfileScreenStyles";

// Styled Components

// React Component
const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    age: 30,
    gender: "Male",
    skills: ["JavaScript", "React", "Node.js"],
    userType: "Developer",
    isVisible: true,
    contactNumber: "123-456-7890",
    profilePic: "https://via.placeholder.com/120",
  });

  const [profilePic, setProfilePic] = useState(profile.profilePic);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save the profile data
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleProfilePicClick = () => {
    const fileInput = document.getElementById(
      "profile-pic-input"
    ) as HTMLInputElement;
    fileInput.click();
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
        setProfile((prev) => ({
          ...prev,
          profilePic: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PageContainer>
      {/* <TopBar>
        <TopbarLeft>
          <Title>Profile Page</Title>
        </TopbarLeft>
      </TopBar> */}
      <ProjectContainer>
        <ProjectInfo>
          <ProfileSection>
            <AvatarContainer onClick={handleProfilePicClick}>
              <Avatar
                src={profilePic}
                alt="Profile Picture"
                sx={{ width: "120px", height: "120px" }}
              />
              <EditIcon className="edit-icon" />
            </AvatarContainer>
            <input
              type="file"
              id="profile-pic-input"
              key={fileInputKey}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleProfilePicChange}
            />
            <EditButton onClick={handleEditClick}>
              <FaEdit /> Edit
            </EditButton>
          </ProfileSection>
          <ProfileDetails>
            <HeaderAndValue>
              <Header>First Name</Header>
              {isEditing ? (
                <TextField
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                <Value>{profile.firstName}</Value>
              )}
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Last Name</Header>
              {isEditing ? (
                <TextField
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                <Value>{profile.lastName}</Value>
              )}
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Age</Header>
              {isEditing ? (
                <TextField
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                <Value>{profile.age}</Value>
              )}
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Gender</Header>
              {isEditing ? (
                <TextField
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                <Value>{profile.gender}</Value>
              )}
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Skills</Header>
              {isEditing ? (
                <TextField
                  name="skills"
                  value={profile.skills.join(", ")}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                <SkillsContainer>
                  {profile.skills.map((skill) => (
                    <Skills key={skill}>{skill}</Skills>
                  ))}
                </SkillsContainer>
              )}
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>User Type</Header>
              {isEditing ? (
                <TextField
                  name="userType"
                  value={profile.userType}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                <Value>{profile.userType}</Value>
              )}
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Visible</Header>
              {isEditing ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isVisible"
                      checked={profile.isVisible}
                      onChange={(e) =>
                        handleChange(e as ChangeEvent<HTMLInputElement>)
                      }
                      color="primary"
                    />
                  }
                  label="Visible"
                />
              ) : (
                <Value>{profile.isVisible ? "Yes" : "No"}</Value>
              )}
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Contact Number</Header>
              {isEditing ? (
                <TextField
                  name="contactNumber"
                  value={profile.contactNumber}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                <Value>{profile.contactNumber}</Value>
              )}
            </HeaderAndValue>
            {isEditing && (
              <ButtonHolder>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </ButtonHolder>
            )}
          </ProfileDetails>
        </ProjectInfo>
      </ProjectContainer>
    </PageContainer>
  );
};

export default ProfilePage;
