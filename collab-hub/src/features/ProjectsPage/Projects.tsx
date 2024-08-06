//Author: Tathya Kapadia
import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  ButtonBase,
  Box,
  Modal,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slide,
  InputBase,
  ToggleButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import GroupIcon from '@mui/icons-material/Group';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

interface Project {
    _id: string;
    createdByEmail: string;
    projectName: string;
    projectDescription: string;
    contributorsEmail: string[];
    projectTechnologies: string;
    projectDomain: string;
  }
  

const options = [
    "All",
    "Web",
    "Mobile",
    "AI/ML",
  ];

  const technologyMapping: Record<string, string> = {
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    'c++': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    'c#': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    'Gcp': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
    'GCP': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
    'gcp': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
    'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'Javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    'Powershell': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg",
    'powershell': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg",
    'ruby': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-plain.svg",
    'Ruby': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-plain.svg",
    'Typescript': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    'typescript': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    'TS': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    'ts': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    'html': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    'Html': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    'HTML': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    'CSS': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    'css': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    'Css': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    'android': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg",
    'Android': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg",
    'kotlin': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    'Kotlin': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    'swift': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
    'Swift': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
    'react': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    'React': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    'React.JS': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    'aws': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    'AWS': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    'Aws': "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
  };

const CustomSearchBar = styled('div')(({ theme }) => ({
  flex: 1,
  padding: '0 10px',
  border: '1px solid #ccc',
  borderRadius: '20px',
  margin: '10px 20px',
  lineHeight: '40px',
  backgroundColor: '#f1f1f1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', 
  width: 'calc(100% - 40px)' 
}));

const ProductCard = styled(Card)({
    margin: 16,
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    '&:hover': {
      boxShadow: '0 12px 20px 0 rgba(0, 0, 0, 0.4)',
      transform: 'scale(1.02)',
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100%', 
    position: 'relative', 
    overflow: 'hidden', 
  });
  
  const ProductImageWrapper = styled('div')({
    width: '100%',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  });
  
  const ProductImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  });
  
  const DescriptionOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    opacity: 0,
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 1,
    },
  }));

function Projects() {
    const [projectList, setProjectList] = useState<Project[]>([]);
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(['All']);
    const navigate = useNavigate();

    useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND_LINK}/listedProjects/getAllProjects`)
        .then(response => response.json())
        .then(data => setProjectList(data))
        .catch(error => console.error('Error fetching projects:', error));
    }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    setSelectedLanguages(prev =>
      checked ? [...prev, name] : prev.filter(lang => lang !== name)
    );
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);  
  };

  const handleButtonClick = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((selectedOption) => selectedOption !== option)
        : [...prev, option]
    );
  };

  // Filter products based on search text and selected languages
  const filteredProjects = projectList.filter((project) => {
    const matchesDomain =
      selectedOptions.includes("All") ||
      selectedOptions.some((option) => project.projectDomain.toLowerCase().includes(option.toLowerCase()));
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchText.toLowerCase());
    const matchesLanguages =
      selectedLanguages.length === 0 ||
      selectedLanguages.some((lang) =>
        project.projectTechnologies.toLowerCase().includes(lang.toLowerCase())
      );

    return matchesDomain && matchesSearch && matchesLanguages;
  });

  return (
    <>
    <div className="filterOption" style={{ paddingTop: '0.7%', paddingBottom: '0.7%', paddingLeft: '0.5%' }}>
          {options.map((option) => (
            <ToggleButton
              key={option}
              value={option}
              selected={selectedOptions.includes(option)}
              onClick={() => handleButtonClick(option)}
              style={{
                borderRadius: "30px",
                backgroundColor: selectedOptions.includes(option)
                  ? "#0073e6"
                  : "#F2F6FB",
                color: selectedOptions.includes(option) ? "white" : "black",
                border: `1px solid ${
                  selectedOptions.includes(option) ? "white" : "white"
                }`,
                padding: "7px",
                margin: "0px 3px",
                minWidth: "100px",
                textAlign: "center",
              }}
            >
              {option}
            </ToggleButton>
          ))}
        </div>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <CustomSearchBar>
          <SearchIcon sx={{ color: 'gray', mr: 2 }} />
          <InputBase
            sx={{ flex: 1 }}
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <FilterListIcon sx={{ color: 'gray', ml: 2 }} onClick={handleOpen} />
        </CustomSearchBar>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Slide direction="left" in={open}>
          <Box sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '30%',
            height: '100%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflow: 'auto'
          }}>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Language
            </Typography>
            <FormGroup>
              {['C', 'C++', 'Java', 'Python', 'Powershell', 'Ruby', 'Javascript', 'HTML', 'CSS'].map((language) => (
                <FormControlLabel
                  control={<Checkbox
                    checked={selectedLanguages.includes(language)}
                    onChange={handleLanguageChange}
                    name={language}
                  />}
                  label={language}
                  key={language}
                />
              ))}
            </FormGroup>
          </Box>
        </Slide>
      </Modal>

     {filteredProjects.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <Typography variant="h6">No projects to show</Typography>
        </Box> 
        ):(
        <Grid container spacing={2}>
          {filteredProjects.map((project, index) => {
            const technologies = project.projectTechnologies.split(',');
            const mainTechnology = technologies[0].trim();
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
                <ButtonBase
                  sx={{ width: '100%', height: '100%', display: 'block', textAlign: 'left' }}
                  onClick={() => navigate(`/project/${project._id}`,{ state: { project } })}
                >
                  <ProductCard>
                    <ProductImageWrapper>
                    <ProductImage
                      src={technologyMapping[mainTechnology|| 'default']}
                      alt={project.projectName}
                    />
                    </ProductImageWrapper>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2, pb: 1 }}>
                      <Typography variant="h6" component="h2" fontWeight="bold" mb={1}>
                        {project.projectName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" mb={1}>
                        {project.projectTechnologies.split(',').slice(0, 3).join(', ')}
                        {project.projectTechnologies.split(',').length > 3 &&
                          ` +${project.projectTechnologies.split(',').length - 3} more`}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <GroupIcon fontSize="small" />
                        <Typography variant="body2" ml={1}>{project.contributorsEmail.length}</Typography>
                      </Box>
                    </CardContent>
                    <Box
                      sx={{
                        backgroundColor: '#0073e6',
                        color: 'white',
                        py: 1,
                        px: 2,
                        textAlign: 'center',
                        mt: -3
                      }}
                    >
                      <Typography variant="body2">
                        {project.projectDomain}
                      </Typography>
                    </Box>
                    <DescriptionOverlay>
                      <Typography variant="body2">
                        {project.projectDescription}
                      </Typography>
                    </DescriptionOverlay>
                  </ProductCard>
                </ButtonBase>
              </Grid>
            );
          })}
        </Grid>
        )}
      

    </>
  );
}

export default Projects;
