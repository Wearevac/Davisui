"use client"
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';

import styles from './Sheets.module.css';

interface AnalysisResult {
    numeric: { [key: string]: { count: number; mean: number; median: number; std: number; nunique: number } };
    categorical: { [key: string]: { unique: number; null_count: number; values: { [key: string]: number } } };
    date: { [key: string]: { min: string; max: string; null_count: number } };
}

export default function SheetInsights() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
            setFile(file);
            setAnalysisResult(null);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', 'user123'); // Replace with actual user ID

            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (response.ok) {
                    setSnackbarMessage('File uploaded successfully');
                } else {
                    setSnackbarMessage(`Upload failed: ${data.error}`);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                setSnackbarMessage('An error occurred during upload');
            } finally {
                setIsLoading(false);
                setSnackbarOpen(true);
            }
        } else {
            setSnackbarMessage('Please upload a CSV or XLSX file');
            setSnackbarOpen(true);
        }
    };

    const handleDisconnect = () => {
        setFile(null);
        setAnalysisResult(null);
    };

    return (
        <>
        <h1>Stay tight! We are building it</h1>
        </>
        // <Box sx={{ flexGrow: 1 }}>
        //     <AppBar position="fixed" className={styles.menu}>
        //         <Toolbar>
        //             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        //                 Davis-Explore: Sheet Insight Hub
        //             </Typography>
        //             <div>
        //                 <IconButton
        //                     size="large"
        //                     aria-label="account of current user"
        //                     aria-controls="menu-appbar"
        //                     aria-haspopup="true"
        //                     onClick={handleMenu}
        //                     color="inherit"
        //                 >
        //                     <AccountCircle />
        //                 </IconButton>
        //                 <Menu
        //                     id="menu-appbar"
        //                     anchorEl={anchorEl}
        //                     anchorOrigin={{
        //                         vertical: 'top',
        //                         horizontal: 'right',
        //                     }}
        //                     keepMounted
        //                     transformOrigin={{
        //                         vertical: 'top',
        //                         horizontal: 'right',
        //                     }}
        //                     open={Boolean(anchorEl)}
        //                     onClose={handleClose}
        //                 >
        //                     <MenuItem onClick={handleClose}>Username</MenuItem>
        //                     <MenuItem onClick={handleClose}>Logout</MenuItem>
        //                     <MenuItem>Profile</MenuItem>
        //                 </Menu>
        //             </div>
        //         </Toolbar>
        //     </AppBar>
        //     <Toolbar />
        //     <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        //         <input
        //             accept=".csv,.xlsx"
        //             style={{ display: 'none' }}
        //             id="raised-button-file"
        //             type="file"
        //             onChange={handleFileUpload}
        //         />
        //         <label htmlFor="raised-button-file">
        //             <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
        //                 Upload File
        //             </Button>
        //         </label>
        //         {file && (
        //             <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        //                 <Typography variant="body1">
        //                     {file.name}
        //                 </Typography>
        //                 <IconButton onClick={handleDisconnect} size="small">
        //                     <CloseIcon />
        //                 </IconButton>
        //             </Box>
        //         )}
        //         {isLoading && <CircularProgress sx={{ mt: 2 }} />}
        //     </Box>
        //     <Snackbar
        //         open={snackbarOpen}
        //         autoHideDuration={6000}
        //         onClose={() => setSnackbarOpen(false)}
        //         message={snackbarMessage}
        //         action={
        //             <IconButton
        //                 size="small"
        //                 aria-label="close"
        //                 color="inherit"
        //                 onClick={() => setSnackbarOpen(false)}
        //             >
        //                 <CloseIcon fontSize="small" />
        //             </IconButton>
        //         }
        //     />
        // </Box>
    );
}

