package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Customer;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Customer")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/addcustomers")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        Customer savedCustomer = customerRepository.save(customer);
        return ResponseEntity.ok(savedCustomer);
    }

    @GetMapping("/getcustomer/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable("id") String id) {
        Optional<Customer> customerOptional = customerRepository.findById(id);
        if (customerOptional.isPresent()) {
            return ResponseEntity.ok(customerOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updatecustomer/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable("id") String id,
            @RequestBody Customer updatedCustomer) {
        Optional<Customer> customerOptional = customerRepository.findById(id);
        if (customerOptional.isPresent()) {
            Customer existingCustomer = customerOptional.get();
            existingCustomer.setFirst_name(updatedCustomer.getFirst_name());
            existingCustomer.setLast_name(updatedCustomer.getLast_name());
            existingCustomer.setContact_information(updatedCustomer.getContact_information());
            existingCustomer.setEmail(updatedCustomer.getEmail());
            existingCustomer.setAddress(updatedCustomer.getAddress());
            existingCustomer.setDriving_license_number(updatedCustomer.getDriving_license_number());
            Customer savedCustomer = customerRepository.save(existingCustomer);
            return ResponseEntity.ok(savedCustomer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deletecustomer/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable("id") String id) {
        Optional<Customer> customerOptional = customerRepository.findById(id);
        if (customerOptional.isPresent()) {
            customerRepository.delete(customerOptional.get());
            return ResponseEntity.ok("Customer deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getallcustomers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return ResponseEntity.ok(customers);
    }
}

// package com.Lyse.Marius.Car.Rent.Management.System.Controller;

// import com.Lyse.Marius.Car.Rent.Management.System.Model.Customer;
// import
// com.Lyse.Marius.Car.Rent.Management.System.Repository.CustomerRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/Customers")
// @CrossOrigin("*")
// public class CustomerController {

// @Autowired
// private CustomerRepository customerRepository;

// @PostMapping("/addcustomer")
// public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
// Customer savedCustomer = customerRepository.save(customer);
// return ResponseEntity.ok(savedCustomer);
// }

// @GetMapping("/getcustomer/{id}")
// public ResponseEntity<Customer> getCustomerById(@PathVariable("id") String
// id) {
// Optional<Customer> customerOptional = customerRepository.findById(id);
// if (customerOptional.isPresent()) {
// return ResponseEntity.ok(customerOptional.get());
// } else {
// return ResponseEntity.notFound().build();
// }
// }

// @PutMapping("/updatecustomer/{id}")
// public ResponseEntity<Customer> updateCustomer(@PathVariable("id") String id,
// @RequestBody Customer updatedCustomer) {
// Optional<Customer> customerOptional = customerRepository.findById(id);
// if (customerOptional.isPresent()) {
// Customer existingCustomer = customerOptional.get();
// existingCustomer.setFirst_name(updatedCustomer.getFirst_name());
// existingCustomer.setLast_name(updatedCustomer.getLast_name());
// existingCustomer.setContact_information(updatedCustomer.getContact_information());
// existingCustomer.setEmail(updatedCustomer.getEmail());
// existingCustomer.setAddress(updatedCustomer.getAddress());
// existingCustomer.setDriving_license_number(updatedCustomer.getDriving_license_number());
// Customer savedCustomer = customerRepository.save(existingCustomer);
// return ResponseEntity.ok(savedCustomer);
// } else {
// return ResponseEntity.notFound().build();
// }
// }

// @DeleteMapping("/deletecustomer/{id}")
// public ResponseEntity<String> deleteCustomer(@PathVariable("id") String id) {
// Optional<Customer> customerOptional = customerRepository.findById(id);
// if (customerOptional.isPresent()) {
// customerRepository.delete(customerOptional.get());
// return ResponseEntity.ok("Customer deleted successfully");
// } else {
// return ResponseEntity.notFound().build();
// }
// }

// @GetMapping("/getallcustomers")
// public ResponseEntity<List<Customer>> getAllCustomers() {
// List<Customer> customers = customerRepository.findAll();
// return ResponseEntity.ok(customers);
// }
// }
