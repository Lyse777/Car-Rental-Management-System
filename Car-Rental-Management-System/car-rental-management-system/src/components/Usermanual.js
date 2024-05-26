import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Usermanual = () => {
    const handleDownload = () => {
        // Create a link element
        const link = document.createElement('a');
        // Set the link's href to the PDF file
        link.href = `${process.env.PUBLIC_URL}/assets/images/USERMANUAL.pdf`;
        // Set the download attribute with a filename
        link.download = 'USERMANUAL.pdf';
        // Append the link to the body
        document.body.appendChild(link);
        // Programmatically click the link to trigger the download
        link.click();
        // Remove the link from the document
        document.body.removeChild(link);
    };

    const handleOpen = () => {
        // Open the PDF in a new tab
        window.open(`${process.env.PUBLIC_URL}/assets/images/USERMANUAL.pdf`, '_blank');
    };

    return (
        <Container className="d-flex flex-column align-items-center min-vh-100 justify-content-center">
            <h1>User Manual</h1>
            <p>Click the buttons below to download or open the User Manual.</p>
            <Button onClick={handleDownload} className="custom-button">Download User Manual</Button>
            <Button onClick={handleOpen} className="custom-button mt-2">Open User Manual</Button>
            <style>
                {`
                    .min-vh-100 {
                        min-height: 100vh;
                    }
                    .custom-button {
                        background-color: gray;
                        border-color: black;
                        color: black;
                    }
                    .custom-button:hover {
                        background-color: black;
                        border-color: gray;
                        color: white;
                    }
                `}
            </style>
        </Container>
    );
};

export default Usermanual;
