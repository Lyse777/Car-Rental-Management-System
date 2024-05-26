package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Location;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/locations")
@CrossOrigin("*")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @PostMapping("/add")
    public ResponseEntity<Location> addLocation(@RequestBody Location location) {
        Location savedLocation = locationRepository.save(location);
        return ResponseEntity.ok(savedLocation);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable("id") String id) {
        Optional<Location> locationOptional = locationRepository.findById(id);
        if (locationOptional.isPresent()) {
            return ResponseEntity.ok(locationOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable("id") String id,
            @RequestBody Location updatedLocation) {
        Optional<Location> locationOptional = locationRepository.findById(id);
        if (locationOptional.isPresent()) {
            Location existingLocation = locationOptional.get();
            existingLocation.setAddress(updatedLocation.getAddress());
            existingLocation.setContact_information(updatedLocation.getContact_information());
            existingLocation.setOperating_hours(updatedLocation.getOperating_hours());
            Location savedLocation = locationRepository.save(existingLocation);
            return ResponseEntity.ok(savedLocation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteLocation(@PathVariable("id") String id) {
        Optional<Location> locationOptional = locationRepository.findById(id);
        if (locationOptional.isPresent()) {
            locationRepository.delete(locationOptional.get());
            return ResponseEntity.ok("Location deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationRepository.findAll();
        return ResponseEntity.ok(locations);
    }
}
