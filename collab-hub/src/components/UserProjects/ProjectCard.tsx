import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Project } from '../../types/ProjectTypes';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <Card className="mb-6 bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-300">
            <CardContent>
                <Box className="flex justify-between items-center">
                    <Typography variant="h5" className="font-bold text-black">
                        {project.projectName}
                    </Typography>
                    {/* <Typography variant="body2" className="text-gray-500">
                        Updated on : {project.updatedOn}
                    </Typography> */}
                </Box>
                <Box className="flex justify-between items-center">
                    <Typography variant="body2" component="p" className="mt-4 text-gray-600">
                        {project.projectDescription}
                    </Typography>

                </Box>
                <Box className="flex justify-between items-center">

                    <Typography variant="body2" component="p" className="mt-4 text-gray-600">
                        {project.projectTechnologies}
                    </Typography>
                </Box>
                <Box className="flex justify-between items-center">

                    <Typography variant="body2" component="p" className="mt-4 text-gray-600">
                        {project.projectDomain}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProjectCard;
