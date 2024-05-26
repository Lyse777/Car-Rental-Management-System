package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Employee;
import com.Lyse.Marius.Car.Rent.Management.System.Model.Location;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.EmployeeRepository;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.LocationRepository;

@RestController
@RequestMapping("/employees")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LocationRepository Locationrepository;

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Location location = Locationrepository.findById(employee.getLocation().getLocation_ID()).orElse(null);
        employee.setLocation(location);
        Employee savedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") String id) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        if (employeeOptional.isPresent()) {
            return ResponseEntity.ok(employeeOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") String id,
                                                   @RequestBody Employee updatedEmployee) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        if (employeeOptional.isPresent()) {
            Employee existingEmployee = employeeOptional.get();
            existingEmployee.setFirst_name(updatedEmployee.getFirst_name());
            existingEmployee.setLast_name(updatedEmployee.getLast_name());
            existingEmployee.setTelephoneNumber(updatedEmployee.getTelephoneNumber());
            existingEmployee.setPosition(updatedEmployee.getPosition());
            Location location = Locationrepository.findById(updatedEmployee.getLocation().getLocation_ID()).orElse(null);
            existingEmployee.setLocation(location);
            Employee savedEmployee = employeeRepository.save(existingEmployee);
            return ResponseEntity.ok(savedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") String id) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        if (employeeOptional.isPresent()) {
            employeeRepository.delete(employeeOptional.get());
            return ResponseEntity.ok("Employee deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return ResponseEntity.ok(employees);
    }
}

