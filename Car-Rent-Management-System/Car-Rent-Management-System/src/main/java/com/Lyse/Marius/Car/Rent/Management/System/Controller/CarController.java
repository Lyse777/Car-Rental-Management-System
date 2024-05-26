package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Car;
// import com.Lyse.Marius.Car.Rent.Management.System.Model.CarModel;
// import com.Lyse.Marius.Car.Rent.Management.System.Model.Industry;
import com.Lyse.Marius.Car.Rent.Management.System.Model.Insurance;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.CarRepository;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.InsuranceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cars")
@CrossOrigin("*")
public class CarController {

    @Autowired
    private CarRepository carRepo;

    @Autowired
    private InsuranceRepository carRepository;

    @PostMapping("/save")
    public ResponseEntity<Car> saveCar(@RequestBody Car car) {
        // Retrieve and set the insurance
        int insuranceId = car.getInsurance().getInsurance_ID();
        Insurance insurance = carRepository.findById(insuranceId).orElse(null);
        if (insurance == null) {
            return ResponseEntity.badRequest().body(null);
        }
        car.setInsurance(insurance);
        car.setCar_status("Available");

        // Save the updated car object
        Car savedCar = carRepo.save(car);

        return ResponseEntity.ok(savedCar);
    }

    // @PostMapping("/save")
    // public ResponseEntity<Car> saveCar(@RequestBody Car car) {
    // // Retrieve the display name for make and model
    // String makeDisplayName = car.getMake().getDisplayName();
    // String modelDisplayName = car.getModel().getDisplayName();

    // // Replace underscores with spaces
    // makeDisplayName = makeDisplayName.replaceAll("_", " ");
    // modelDisplayName = modelDisplayName.replaceAll("_", " ");

    // // Update the car object with the formatted display names
    // Industry makeEnum = Industry.fromDisplayName(makeDisplayName);
    // CarModel modelEnum = CarModel.fromDisplayName(modelDisplayName);
    // car.setMake(makeEnum);
    // car.setModel(modelEnum);
    // int carId = car.getInsurance().getInsurance_ID();
    // System.out.println("Insurance ID: " + carId);
    // Insurance insurance = carRepository.findById(carId).orElse(null);
    // if (insurance == null) {
    // return ResponseEntity.badRequest().body(null);
    // }
    // car.setInsurance(insurance);
    // car.setCar_status("Available");
    // // Save the updated car object
    // Car savedCar = carRepo.save(car);

    // // Convert the display names back to the original format before returning
    // savedCar.setMake(Industry.valueOf(makeDisplayName.replaceAll(" ", "_")));
    // savedCar.setModel(CarModel.valueOf(modelDisplayName.replaceAll(" ", "_")));

    // return ResponseEntity.ok(savedCar);
    // }

    @GetMapping("/all")
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carRepo.findAll();
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable("id") String id) {
        Optional<Car> carOptional = carRepo.findById(id);
        if (carOptional.isPresent()) {
            return ResponseEntity.ok(carOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable("id") String id, @RequestBody Car car) {
        Optional<Car> carOptional = carRepo.findById(id);
        if (carOptional.isPresent()) {
            Car existingCar = carOptional.get();

            existingCar.setMake(car.getMake());
            existingCar.setModel(car.getModel());
            existingCar.setYears(car.getYears());
            existingCar.setColor(car.getColor());
            existingCar.setImage(car.getImage());
            existingCar.setMileage(car.getMileage());
            existingCar.setRental_price_per_day(car.getRental_price_per_day());
            
            // Save the updated car
            Car updatedCar = carRepo.save(existingCar);
            return ResponseEntity.ok(updatedCar);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteCar(@PathVariable("id") String id) {
    // Optional<Car> carOptional = carRepo.findById(id);
    // if (carOptional.isPresent()) {
    // carRepo.deleteById(id);
    // return ResponseEntity.noContent().build();
    // } else {
    // return ResponseEntity.notFound().build();
    // }
    // }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable("id") String id) {
        Optional<Car> carOptional = carRepo.findById(id);
        if (carOptional.isPresent()) {
            carRepo.deleteById(id);
            return ResponseEntity.ok("Car with ID " + id + " deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car with ID " + id + " not found.");
        }
    }

    // @GetMapping("/search")
    // public ResponseEntity<Car> searchCarById(@RequestParam("car_id") String id) {
    // Optional<Car> carOptional = carRepo.findById(id);
    // if (carOptional.isPresent()) {
    // return ResponseEntity.ok(carOptional.get());
    // } else {
    // return ResponseEntity.notFound().build();
    // }
    // }
    @GetMapping("/search/{car_id}")
    public ResponseEntity<?> searchCarById(@PathVariable("car_id") String id) {
        Optional<Car> carOptional = carRepo.findById(id);
        if (carOptional.isPresent()) {
            return ResponseEntity.ok(carOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car with ID " + id + " not found.");
        }
    }

}
