package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Insurance;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.InsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/insurance")
@CrossOrigin("*")
public class InsuranceController {

    @Autowired
    private InsuranceRepository insuranceRepository;

    @PostMapping("/add")
    public ResponseEntity<Insurance> addInsurance(@RequestBody Insurance insurance) {
        Insurance savedInsurance = insuranceRepository.save(insurance);
        return ResponseEntity.ok(savedInsurance);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Insurance> getInsuranceById(@PathVariable("id") int id) {
        Optional<Insurance> insuranceOptional = insuranceRepository.findById(id);
        if (insuranceOptional.isPresent()) {
            return ResponseEntity.ok(insuranceOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Insurance> updateInsurance(@PathVariable("id") int id,
            @RequestBody Insurance updatedInsurance) {
        Optional<Insurance> insuranceOptional = insuranceRepository.findById(id);
        if (insuranceOptional.isPresent()) {
            Insurance existingInsurance = insuranceOptional.get();
            existingInsurance.setCoverage_type(updatedInsurance.getCoverage_type());
            existingInsurance.setInsurance_company(updatedInsurance.getInsurance_company());
            existingInsurance.setPremium_amount(updatedInsurance.getPremium_amount());
            Insurance savedInsurance = insuranceRepository.save(existingInsurance);
            return ResponseEntity.ok(savedInsurance);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteInsurance(@PathVariable("id") int id) {
        Optional<Insurance> insuranceOptional = insuranceRepository.findById(id);
        if (insuranceOptional.isPresent()) {
            insuranceRepository.delete(insuranceOptional.get());
            return ResponseEntity.ok("Insurance deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Insurance>> getAllInsurance() {
        List<Insurance> insuranceList = insuranceRepository.findAll();
        return ResponseEntity.ok(insuranceList);
    }
}

// package com.Lyse.Marius.Car.Rent.Management.System.Controller;

// public class InsuranceController {

// }
