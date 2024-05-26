package com.Lyse.Marius.Car.Rent.Management.System.Model;

import java.time.Year;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Car")
public class Car {
    @Id
    @Column(name = "car_id", unique = true, nullable = false, length = 10)
    private String car_ID;
    @Column(name = "make", nullable = false, unique = false, length = 40)
    @Enumerated(EnumType.STRING)
    private Industry make;
    @Column(name = "model", nullable = false, unique = false, length = 40)
    @Enumerated(EnumType.STRING)
    private CarModel model;
    @Column(name = "years", nullable = false, unique = false, length = 40)
    private Year years;
    @Column(name = "color", nullable = false, unique = false, length = 40)
    private String color;
    @Column(name = "image", nullable = false, unique = true, length = 255)
    private String image;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Column(name = "mileage", nullable = false, length = 10)
    private int mileage;
    @Column(name = "rental_price_per_day", nullable = false, length = 10)
    private int rental_price_per_day;

    @OneToOne(mappedBy = "car", cascade = CascadeType.REMOVE)
    private Maintenance maintenance;

    @OneToMany(mappedBy = "car", cascade = CascadeType.REMOVE)
    private List<Rental> rental;

    @ManyToOne
    @JoinColumn(name = "insurance_id")
    private Insurance insurance;

    public String getCar_ID() {
        return car_ID;
    }

    public void setCar_ID(String car_ID) {
        this.car_ID = car_ID;
    }

    public Industry getMake() {
        return make;
    }

    public void setMake(Industry make) {
        this.make = make;
    }

    public CarModel getModel() {
        return model;
    }

    public void setModel(CarModel model) {
        this.model = model;
    }

    public Year getYears() {
        return years;
    }

    public void setYears(Year years) {
        this.years = years;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getMileage() {
        return mileage;
    }

    public void setMileage(int mileage) {
        this.mileage = mileage;
    }

    public int getRental_price_per_day() {
        return rental_price_per_day;
    }

    public void setRental_price_per_day(int rental_price_per_day) {
        this.rental_price_per_day = rental_price_per_day;
    }

    public Maintenance getMaintenance() {
        return maintenance;
    }

    public void setMaintenance(Maintenance maintenance) {
        this.maintenance = maintenance;
    }

    public List<Rental> getRental() {
        return rental;
    }

    public void setRental(List<Rental> rental) {
        this.rental = rental;
    }

    public Insurance getInsurance() {
        return insurance;
    }

    public void setInsurance(Insurance insurance) {
        this.insurance = insurance;
    }

}

// package com.Lyse.Marius.Car.Rent.Management.System.Model;

// import java.time.Year;
// import java.util.List;
// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.EnumType;
// import jakarta.persistence.Enumerated;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.OneToMany;
// import jakarta.persistence.OneToOne;
// import jakarta.persistence.Table;

// @Entity
// @Table(name = "Car")
// public class Car {
// @Id
// @Column(name = "car_id", nullable = false, length = 10)
// private String carId;

// @Enumerated(EnumType.STRING)
// @Column(name = "make", nullable = false, length = 40)
// private Industry make;

// @Enumerated(EnumType.STRING)
// @Column(name = "model", nullable = false, length = 40)
// private CarModel model;

// @Column(name = "years", nullable = false)
// private Year years;

// @Column(name = "color", nullable = false, length = 40)
// private String color;

// @Column(name = "mileage", nullable = false)
// private int mileage;

// @Column(name = "rental_price_per_day", nullable = false)
// private int rentalPricePerDay;

// @OneToOne(mappedBy = "car", cascade = CascadeType.REMOVE)
// private Maintenance maintenance;

// @OneToMany(mappedBy = "car", cascade = CascadeType.REMOVE)
// private List<Rental> rental;

// @ManyToOne
// @JoinColumn(name = "insurance_id")
// private Insurance insurance;

// @Column(name = "image", nullable = false, length = 255) // Adjust the length
// as needed
// private String image;

// // Getters and setters
// public String getCarId() {
// return carId;
// }

// public void setCarId(String carId) {
// this.carId = carId;
// }

// public Industry getMake() {
// return make;
// }

// public void setMake(Industry make) {
// this.make = make;
// }

// public CarModel getModel() {
// return model;
// }

// public void setModel(CarModel model) {
// this.model = model;
// }

// public Year getYears() {
// return years;
// }

// public void setYears(Year years) {
// this.years = years;
// }

// public String getColor() {
// return color;
// }

// public void setColor(String color) {
// this.color = color;
// }

// public int getMileage() {
// return mileage;
// }

// public void setMileage(int mileage) {
// this.mileage = mileage;
// }

// public int getRentalPricePerDay() {
// return rentalPricePerDay;
// }

// public void setRentalPricePerDay(int rentalPricePerDay) {
// this.rentalPricePerDay = rentalPricePerDay;
// }

// public Maintenance getMaintenance() {
// return maintenance;
// }

// public void setMaintenance(Maintenance maintenance) {
// this.maintenance = maintenance;
// }

// public List<Rental> getRental() {
// return rental;
// }

// public void setRental(List<Rental> rental) {
// this.rental = rental;
// }

// public Insurance getInsurance() {
// return insurance;
// }

// public void setInsurance(Insurance insurance) {
// this.insurance = insurance;
// }

// public String getImage() {
// return image;
// }

// public void setImage(String image) {
// this.image = image;
// }
// }
