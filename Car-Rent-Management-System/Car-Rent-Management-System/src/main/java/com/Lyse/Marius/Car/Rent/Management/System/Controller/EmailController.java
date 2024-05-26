package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Lyse.Marius.Car.Rent.Management.System.Model.EmailDetails;
import com.Lyse.Marius.Car.Rent.Management.System.service.EmailService;

// Annotation
@RestController
// Class
public class EmailController {

    @Autowired
    private EmailService emailService;

    // Sending a simple Email
    @PostMapping("/sendMail")
    public String sendMail(@RequestBody EmailDetails details) {
        String status = emailService.sendSimpleMail(details);

        return status;
    }

    // Sending email with attachment
    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(
            @RequestBody EmailDetails details) {
        String status = emailService.sendMailWithAttachment(details);

        return status;
    }
}
