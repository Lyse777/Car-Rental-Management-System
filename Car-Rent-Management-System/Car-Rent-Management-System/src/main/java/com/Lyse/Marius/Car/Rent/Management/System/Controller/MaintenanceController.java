package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Car;
import com.Lyse.Marius.Car.Rent.Management.System.Model.Employee;
import com.Lyse.Marius.Car.Rent.Management.System.Model.Maintenance;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.CarRepository;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.EmployeeRepository;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/maintenance")
@CrossOrigin("*")
public class MaintenanceController {

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/add")
    public ResponseEntity<Maintenance> addMaintenance(@RequestBody Maintenance maintenance) {

        String carId = maintenance.getCar().getCar_ID();
        System.out.println("Car ID: " + carId);
        Car car = carRepository.findById(carId).orElse(null);
        if (car == null) {
            return ResponseEntity.badRequest().body(null);
        }

        String EmployeeId = maintenance.getEmployee().getEmployee_ID();
        System.out.println("Employee ID: " + EmployeeId);
        Employee employee = employeeRepository.findById(EmployeeId).orElse(null);
        if (employee == null) {
            return ResponseEntity.badRequest().body(null);
        }

        maintenance.setCar(car);
        maintenance.setEmployee(employee);

        Maintenance savedMaintenance = maintenanceRepository.save(maintenance);
        return ResponseEntity.ok(savedMaintenance);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Maintenance> getMaintenanceById(@PathVariable("id") int id) {
        Optional<Maintenance> maintenanceOptional = maintenanceRepository.findById(id);
        if (maintenanceOptional.isPresent()) {
            return ResponseEntity.ok(maintenanceOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Maintenance> updateMaintenance(@PathVariable("id") int id,
            @RequestBody Maintenance updatedMaintenance) {
        Optional<Maintenance> maintenanceOptional = maintenanceRepository.findById(id);
        if (maintenanceOptional.isPresent()) {
            Maintenance existingMaintenance = maintenanceOptional.get();
            existingMaintenance.setMaintenance_type(updatedMaintenance.getMaintenance_type());
            existingMaintenance.setMaintenance_date(updatedMaintenance.getMaintenance_date());
            existingMaintenance.setMaintenance_cost(updatedMaintenance.getMaintenance_cost());
            existingMaintenance.setCar(updatedMaintenance.getCar());
            existingMaintenance.setEmployee(updatedMaintenance.getEmployee());
            Maintenance savedMaintenance = maintenanceRepository.save(existingMaintenance);
            return ResponseEntity.ok(savedMaintenance);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMaintenance(@PathVariable("id") int id) {
        Optional<Maintenance> maintenanceOptional = maintenanceRepository.findById(id);
        if (maintenanceOptional.isPresent()) {
            maintenanceRepository.delete(maintenanceOptional.get());
            return ResponseEntity.ok("Maintenance deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Maintenance>> getAllMaintenance() {
        List<Maintenance> maintenanceList = maintenanceRepository.findAll();
        return ResponseEntity.ok(maintenanceList);
    }
}

// package com.Lyse.Marius.Car.Rent.Management.System.Controller;

// public class MaintenanceController {

// }
