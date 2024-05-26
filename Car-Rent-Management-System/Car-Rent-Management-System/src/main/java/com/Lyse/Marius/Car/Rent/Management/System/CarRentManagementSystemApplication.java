package com.Lyse.Marius.Car.Rent.Management.System;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.ApplicationContext;
import com.Lyse.Marius.Car.Rent.Management.System.Model.PDFGenerator;

@SpringBootApplication
@ComponentScan(basePackages = { "com.Lyse.Marius.Car.Rent.Management.System" })
public class CarRentManagementSystemApplication {

	public static void main(String[] args) {
		ApplicationContext ac = SpringApplication.run(CarRentManagementSystemApplication.class, args);

		PDFGenerator pDFGenerator = ac.getBean("pdfGenerator", PDFGenerator.class);

		pDFGenerator.generatePdfReport();

	}

}
