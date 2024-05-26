package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Car;
import com.Lyse.Marius.Car.Rent.Management.System.Model.Payment;
import com.Lyse.Marius.Car.Rent.Management.System.Model.Rental;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.CarRepository;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.PaymentRepository;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.RentalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
@CrossOrigin("*")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private RentalRepository rentrepository1;

    @Autowired
    private CarRepository carRepository;

    @PostMapping("/adds")
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment) {
        int rentId = payment.getRental().getRental_ID();
        Rental rent = rentrepository1.findById(rentId).orElse(null);
        if (rent == null) {
            return ResponseEntity.badRequest().body(null);
        }

        payment.setRental(rent);
        Payment savedPayment = paymentRepository.save(payment);

        // Update the payment status
        rent.setPayment_status("Successfully paid for your rental.");
        rentrepository1.save(rent);

        // Update the car status
        Car car = rent.getCar();
        car.setCar_status("Borrowed");
        carRepository.save(car);

        System.out.println("Successfully paid for your rental and updated car status.");
        return ResponseEntity.ok(savedPayment);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable("id") int id) {
        Optional<Payment> paymentOptional = paymentRepository.findById(id);
        if (paymentOptional.isPresent()) {
            return ResponseEntity.ok(paymentOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable("id") int id, @RequestBody Payment updatedPayment) {
        Optional<Payment> paymentOptional = paymentRepository.findById(id);
        if (paymentOptional.isPresent()) {
            Payment existingPayment = paymentOptional.get();
            existingPayment.setPayment_date(updatedPayment.getPayment_date());
            existingPayment.setPayment_method(updatedPayment.getPayment_method());
            existingPayment.setAmount_paid(updatedPayment.getAmount_paid());
            existingPayment.setRental(updatedPayment.getRental());
            Payment savedPayment = paymentRepository.save(existingPayment);
            System.out.println("successfully update the payment");
            return ResponseEntity.ok(savedPayment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePayment(@PathVariable("id") int id) {
        try {
            Optional<Payment> paymentOptional = paymentRepository.findById(id);
            if (paymentOptional.isPresent()) {
                Payment payment = paymentOptional.get();
                Rental rental = payment.getRental();
                if (rental != null) {
                    // Update the associated rental's payment to null or delete the rental entirely,
                    // depending on your business logic
                    rental.setPayment(null); // or rentalRepository.delete(rental);

                    // Update car status to available
                    Car car = rental.getCar();
                    if (car != null) {
                        car.setCar_status("Available");
                        carRepository.save(car);
                    }
                }

                paymentRepository.delete(payment);
                return ResponseEntity.ok("Payment deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while deleting the payment: " + e.getMessage());
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return ResponseEntity.ok(payments);
    }
}
