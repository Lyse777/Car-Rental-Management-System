package com.Lyse.Marius.Car.Rent.Management.System.service;


import com.Lyse.Marius.Car.Rent.Management.System.Model.EmailDetails;

// Interface
public interface EmailService {

    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetails details);

    // Method
    // To send an email with attachment
    String sendMailWithAttachment(EmailDetails details);
}
