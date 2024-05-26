package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PdfController {

    @GetMapping("/downloadReport")
    public ResponseEntity<Resource> downloadReport() throws IOException {
        // Path to the generated PDF file
        String pdfFilePath = "C:/Users/Adelain/Documents/PdfReportRepo/Rental-Report-26_May_2024.pdf";

        // Load the PDF file as a resource
        Path path = Paths.get(pdfFilePath);
        byte[] pdfBytes = Files.readAllBytes(path);
        ByteArrayResource resource = new ByteArrayResource(pdfBytes);

        // Set content type as application/pdf
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);

        // Set content disposition as attachment to trigger download
        headers.setContentDispositionFormData("attachment", "Employee_Report.pdf");

        // Return the PDF file as ResponseEntity
        return ResponseEntity.ok()
                .headers(headers)
                .body(resource);
    }
}

