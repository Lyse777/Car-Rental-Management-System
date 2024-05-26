package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Rental;
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

    @PostMapping("/add")
    public ResponseEntity<Rental> addRental(@RequestBody Rental rental) {
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

    @PutMapping("/update/{id}")
    public ResponseEntity<Rental> updateRental(@PathVariable("id") int id, @RequestBody Rental updatedRental) {
        Optional<Rental> rentalOptional = rentalRepository.findById(id);
        if (rentalOptional.isPresent()) {
            Rental existingRental = rentalOptional.get();
            existingRental.setRental_start_date(updatedRental.getRental_start_date());
            existingRental.setReturn_date(updatedRental.getReturn_date());
            existingRental.setTotal_rental_cost(updatedRental.getTotal_rental_cost());
            existingRental.setPayment_status(updatedRental.getPayment_status());
            existingRental.setEmployee(updatedRental.getEmployee());
            existingRental.setPayment(updatedRental.getPayment());
            existingRental.setCar(updatedRental.getCar());
            existingRental.setCustomer(updatedRental.getCustomer());
            Rental savedRental = rentalRepository.save(existingRental);
            return ResponseEntity.ok(savedRental);
        } else {
            return ResponseEntity.notFound().build();
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
