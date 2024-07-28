//Author : Jainish Patel

import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import ProjectCard from '../ProjectCard';
import SearchBar from '../SearchBar';
import Stats from '../Stats';
import { Project } from '../../../types/ProjectTypes';
import axios from 'axios';

const ContributedProjects: React.FC = () => {
    const theme = useTheme();
    useMediaQuery(theme.breakpoints.down('sm'));
    const [projects, setProjects] = useState<Project[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchContributedProjects = async () => {
            try {
                const email = localStorage.getItem("email");
                const response = await axios.post<Project[]>(
                    `${process.env.REACT_APP_BACKEND_LINK}/contributedProjects/fetchProjects`,
                    { "contributorEmail": email }
                );
                setProjects(response.data);

            } catch (err) {
                console.log(err);
            }
        };
        fetchContributedProjects();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const filteredProjects = projects.filter(project =>
        project.projectName.toLowerCase().includes(search.toLowerCase()) ||
        project.projectDescription.toLowerCase().includes(search.toLowerCase()) ||
        project.projectTechnologies.toLowerCase().includes(search.toLowerCase()) ||
        project.projectDomain.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <Box className="container mx-auto px-4 py-6">
                <Box className="bg-white p-4 rounded-md shadow-md mb-6 border border-gray-300">
                    <Grid container spacing={2} className="mb-4" alignItems="center">
                        <Grid item xs={12} md={10}>
                            <SearchBar value={search} onChange={handleSearchChange} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project, index) => (
                                    <ProjectCard key={index} project={project} />
                                ))
                            ) : (
                                <Typography variant="h6" style={{ margin: '20px' }}>
                                    No projects found.
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stats count={projects.length} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
};

export default ContributedProjects;
