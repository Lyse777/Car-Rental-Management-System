package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Car;
import com.Lyse.Marius.Car.Rent.Management.System.Model.Customer;
import com.Lyse.Marius.Car.Rent.Management.System.Model.Employee;
import com.Lyse.Marius.Car.Rent.Management.System.Model.Rental;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.CarRepository;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.CustomerRepository;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.EmployeeRepository;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rentals")
@CrossOrigin("*")
public class RentalController {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // @PostMapping("/adds")
    // public ResponseEntity<Rental> addRental(@RequestBody Rental rental) {
    // // Log incoming rental data
    // System.out.println("Incoming rental data: " + rental);

    // // Check if car field is null
    // // if (rental.getCar() == null) {
    // // return ResponseEntity.badRequest().body(null);
    // // }

    // // Retrieve car
    // String carId = rental.getCar().getCar_ID();
    // System.out.println("Car ID: " + carId);
    // Car car = carRepository.findById(carId).orElse(null);
    // if (car == null) {
    // return ResponseEntity.badRequest().body(null);
    // }

    // // Retrieve customer
    // String customerId = rental.getCustomer().getCustomer_ID();
    // System.out.println("Customer ID: " + customerId);
    // Customer customer = customerRepository.findById(customerId).orElse(null);
    // if (customer == null) {
    // return ResponseEntity.badRequest().body(null);
    // }

    // // Retrieve employee
    // String employeeId = rental.getEmployee().getEmployee_ID();
    // System.out.println("Employee ID: " + employeeId);
    // Employee employee = employeeRepository.findById(employeeId).orElse(null);
    // if (employee == null) {
    // return ResponseEntity.badRequest().body(null);
    // }

    // // Set the retrieved entities to the rental
    // rental.setCar(car);
    // rental.setCustomer(customer);
    // rental.setEmployee(employee);

    // // Save the rental
    // Rental savedRental = rentalRepository.save(rental);

    // return ResponseEntity.ok(savedRental);
    // }

    @PostMapping("/adds")
    public ResponseEntity<Rental> addRental(@RequestBody Rental rental) {
        // Log incoming rental data
        System.out.println("Incoming rental data: " + rental);

        // Retrieve car
        String carId = rental.getCar().getCar_ID();
        System.out.println("Car ID: " + carId);
        Car car = carRepository.findById(carId).orElse(null);
        if (car == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Retrieve customer
        String customerId = rental.getCustomer().getCustomer_ID();
        System.out.println("Customer ID: " + customerId);
        Customer customer = customerRepository.findById(customerId).orElse(null);
        if (customer == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Retrieve employee
        String employeeId = rental.getEmployee().getEmployee_ID();
        System.out.println("Employee ID: " + employeeId);
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        if (employee == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Set the retrieved entities to the rental
        rental.setCar(car);
        rental.setCustomer(customer);
        rental.setEmployee(employee);

        // Save the rental
        Rental savedRental = rentalRepository.save(rental);

        return ResponseEntity.ok(savedRental);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Rental> getRentalById(@PathVariable("id") int id) {
        Optional<Rental> rentalOptional = rentalRepository.findById(id);
        if (rentalOptional.isPresent()) {
            return ResponseEntity.ok(rentalOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updates/{id}")
    public ResponseEntity<Rental> updateRental(@PathVariable int id, @RequestBody Rental rentalDetails) {
        try {
            Optional<Rental> rentalOptional = rentalRepository.findById(id);
            if (!rentalOptional.isPresent()) {
                System.out.println("i have Receive ID :" + id);
                return ResponseEntity.notFound().build();
            }

            Rental rental = rentalOptional.get();

            // Retrieve and set car
            String carId = rentalDetails.getCar().getCar_ID();
            Car car = carRepository.findById(carId).orElse(null);
            System.out.println("i have receive the car ID is " + car);
            if (car == null) {
                System.out.println("fail to contnue because the ID for car is null");
                return ResponseEntity.badRequest().body(null);
            }

            // Retrieve and set customer
            String customerId = rentalDetails.getCustomer().getCustomer_ID();
            Customer customer = customerRepository.findById(customerId).orElse(null);
            System.out.println("I have reeceving the customer ID " + customer);
            if (customer == null) {
                System.out.println("fail to contnue because the ID for customer is null");
                return ResponseEntity.badRequest().body(null);
            }

            // Retrieve and set employee
            String employeeId = rentalDetails.getEmployee().getEmployee_ID();
            Employee employee = employeeRepository.findById(employeeId).orElse(null);
            System.out.println("I have reeceving the Employee ID " + employee);
            if (employee == null) {
                System.out.println("fail to contnue because the ID for emplyee is null");
                return ResponseEntity.badRequest().body(null);
            }

            // Update rental details
            rental.setRental_start_date(rentalDetails.getRental_start_date());
            rental.setReturn_date(rentalDetails.getReturn_date());
            rental.setTotal_rental_cost(rentalDetails.getTotal_rental_cost());
            rental.setPayment_status(rentalDetails.getPayment_status());
            rental.setCar(car);
            rental.setCustomer(customer);
            rental.setEmployee(employee);

            // Save the updated rental
            Rental updatedRental = rentalRepository.save(rental);
            System.out.println("successfully update Renal ");
            return ResponseEntity.ok(updatedRental);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRental(@PathVariable("id") int id) {
        Optional<Rental> rentalOptional = rentalRepository.findById(id);
        if (rentalOptional.isPresent()) {
            rentalRepository.delete(rentalOptional.get());
            return ResponseEntity.ok("Rental deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Rental>> getAllRentals() {
        List<Rental> rentalList = rentalRepository.findAll();
        return ResponseEntity.ok(rentalList);
    }
}
