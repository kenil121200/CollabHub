import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  Avatar,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const ProjectContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const EditIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 5px;
  color: white;
`;

const ProfileDetails = styled.div`
  width: 100%;
`;

const HeaderAndValue = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Header = styled.h3`
  margin-bottom: 5px;
  font-size: 1rem;
  font-weight: 500;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;

const Skills = styled.div`
  display: flex;
  align-items: center;
  background: #e0e0e0;
  padding: 5px 10px;
  border-radius: 20px;
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

// React Component
const ProfileInformation: React.FC = () => {
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    skills: string[];
    typeOfUser: string;
    isVisible: boolean;
    contactNumber: string;
    profilePic: string;
    email: string; // Added email field
  }>({
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    skills: [],
    typeOfUser: "",
    isVisible: true,
    contactNumber: "",
    profilePic: "",
    email: "", // Initialize email field
  });
  const { handleLogin } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [error, setError] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setProfile((prev) => ({
      ...prev,
      typeOfUser: event.target.value,
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

  const createProfile = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/profile/setProfile`,
        profile
      );
      localStorage.setItem("email", profile.email);
      handleLogin();
    } catch (err) {
      setError("Failed to create profile.");
    }
  };

  const handleSave = () => {
    if (
      !profile.firstName ||
      !profile.lastName ||
      !profile.age ||
      !profile.gender ||
      !profile.typeOfUser ||
      !profile.contactNumber ||
      !profile.email // Added email check
    ) {
      setError("All fields are required.");
      return;
    }
    createProfile();
  };

  const handleCancel = () => {
    // Optionally handle form cancelation (e.g., redirect or clear form)
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
      <ProjectContainer>
        <ProjectInfo>
          <ProfileSection>
            <AvatarContainer onClick={handleProfilePicClick}>
              <Avatar
                src={profilePic}
                alt="Profile Picture"
                sx={{ width: "100px", height: "100px" }} // Smaller avatar
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
          </ProfileSection>
          <ProfileDetails>
            <HeaderAndValue>
              <Header>First Name</Header>
              <TextField
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                size="small"
                required
              />
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Last Name</Header>
              <TextField
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                size="small"
                required
              />
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Age</Header>
              <TextField
                name="age"
                value={profile.age}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                required
              />
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Gender</Header>
              <TextField
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                size="small"
                required
              />
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Email</Header>
              <TextField
                name="email"
                value={profile.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                size="small"
                type="email"
                required
              />
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Skills</Header>
              <>
                <TextField
                  name="skillsInput"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  variant="outlined"
                  fullWidth
                  size="small"
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
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>User Type</Header>
              <Select
                name="typeOfUser"
                value={profile.typeOfUser}
                onChange={handleSelectChange} // Updated handler
                variant="outlined"
                fullWidth
                size="small"
                required
              >
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Project Owner">Project Owner</MenuItem>
              </Select>
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Visible</Header>
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
            </HeaderAndValue>
            <HeaderAndValue>
              <Header>Contact Number</Header>
              <TextField
                name="contactNumber"
                value={profile.contactNumber}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                size="small"
                required
              />
            </HeaderAndValue>
            <ButtonHolder>
              <Button variant="contained" color="primary" onClick={handleSave}>
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
            {error && <div style={{ color: "red" }}>{error}</div>}
          </ProfileDetails>
        </ProjectInfo>
      </ProjectContainer>
    </PageContainer>
  );
};

export default ProfileInformation;
