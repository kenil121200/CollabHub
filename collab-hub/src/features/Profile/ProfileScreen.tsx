import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {
  Avatar,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import axios from "axios";
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

// React Component
const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    skills: string[];
    userType: string;
    isVisible: boolean;
    contactNumber: string;
    profilePic: string;
  }>({
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    skills: [],
    userType: "",
    isVisible: true,
    contactNumber: "",
    profilePic: "",
  });
  const [profilePic, setProfilePic] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const fetchProfileData = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_LINK}/profile/fetchProfile`,
            { email }
          );
          const data = response.data;

          setProfile(data);
          setProfilePic(data.profilePic);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch profile data.");
          setLoading(false);
        }
      };

      fetchProfileData();
    } else {
      setError("User not found.");
      setLoading(false);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setProfile((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "skills"
          ? value.split(",").map((skill) => skill.trim())
          : value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() === "") return;
    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()],
    }));
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const updateProfile = async () => {
    const email = localStorage.getItem("email");
    if (email) {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_LINK}/profile/updateProfile`,
          { email, ...profile }
        );
        setIsEditing(false);
      } catch (err) {
        setError("Failed to update profile data.");
      }
    } else {
      setError("User not found.");
    }
  };

  const handleSave = () => {
    updateProfile();
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PageContainer>
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
                <>
                  <TextField
                    name="skillsInput"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    variant="outlined"
                    fullWidth
                    placeholder="Add a skill"
                  />
                  <IconButton onClick={handleAddSkill}>
                    <FaPlus />
                  </IconButton>
                  <SkillsContainer>
                    {profile.skills.map((skill) => (
                      <Skills key={skill}>
                        {skill}
                        <IconButton onClick={() => handleRemoveSkill(skill)}>
                          <FaTrash color="gray" />
                        </IconButton>
                      </Skills>
                    ))}
                  </SkillsContainer>
                </>
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
                      onChange={handleChange}
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
