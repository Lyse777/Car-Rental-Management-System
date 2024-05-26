package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Lyse.Marius.Car.Rent.Management.System.Model.PDFGenerator;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    @Value("${pdfDir}")
    private String pdfDir;

    @Value("${reportFileName}")
    private String reportFileName;

    @Value("${reportFileNameDateFormat}")
    private String reportFileNameDateFormat;

    @GetMapping("/downloadReport")
    public ResponseEntity<FileSystemResource> downloadReport() {
        String fileNameWithDate = new PDFGenerator().getPdfNameWithDate();
        File file = new File(fileNameWithDate);

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        FileSystemResource resource = new FileSystemResource(file);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }
}


