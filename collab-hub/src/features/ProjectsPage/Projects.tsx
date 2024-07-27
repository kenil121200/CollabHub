import React, { useState, ChangeEvent } from 'react';
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
import products from './productlist.json'; // Ensure this points to the correct location
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search'; // Search icon
import FilterListIcon from '@mui/icons-material/FilterList'; // Filter icon
import { styled } from '@mui/system'; // Import for styled utility


// Define the type for your products
interface Product {
  title: string;
  labels: string;
  percentage: string;
  product_image: string;
}

const options = [
    "All",
    "Web",
    "Mobile",
    "AI/ML",
  ];

// Styled search bar with Material-UI styles
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
  justifyContent: 'space-between', // Ensure space distribution between items
  width: 'calc(100% - 40px)' // Adjust width accounting for margin
}));

// Styled components for product cards and images
const ProductCard = styled(Card)({
  margin: 16,
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  '&:hover': {
    boxShadow: '0 12px 20px 0 rgba(0, 0, 0, 0.4)',
    transform: 'scale(1.02)',
  },
});

const ProductImageWrapper = styled('div')({
  width: '100%',  // Full width of its parent
  height: '350px',  // Adjust this height to control how big the image appears
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden'  // Ensures no part of the image spills out
});

const ProductImage = styled('img')({
  width: '100%',  // Ensures the image fills the width of ProductImageWrapper
  height: '100%',  // Ensures the image fills the height of ProductImageWrapper
  objectFit: 'cover'  // Ensures the image covers the area without being stretched
});

function Projects() {
  const [productList] = useState<Product[]>(products as Product[]);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(['All']);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    setSelectedLanguages(prev =>
      checked ? [...prev, name] : prev.filter(lang => lang !== name)
    );
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);  // Update search text based on user input
  };

  const handleButtonClick = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((selectedOption) => selectedOption !== option)
        : [...prev, option]
    );
  };

  // Filter products based on search text and selected languages
  const filteredProducts = productList.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedLanguages.length === 0 || selectedLanguages.some(lang => product.labels.toLowerCase().includes(lang.toLowerCase())))
  );

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
              {['C', 'C++', 'Java', 'Python', 'Powershell', 'Ruby', 'AWS', 'GCP', 'Javascript', 'HTML', 'CSS'].map((language) => (
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

      <Grid container spacing={2}>
        {filteredProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ButtonBase onClick={() => alert("Card Clicked")}>
              <ProductCard>
                <ProductImageWrapper>
                  <ProductImage src={product.product_image} alt={product.title} />
                </ProductImageWrapper>
                <CardContent>
                  <Typography variant="h6" component="h2">{product.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{product.labels}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{`${product.percentage} project Complete`}</Typography>
                </CardContent>
              </ProductCard>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Projects;
