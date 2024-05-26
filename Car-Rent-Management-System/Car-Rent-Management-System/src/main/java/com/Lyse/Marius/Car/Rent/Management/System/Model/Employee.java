package com.Lyse.Marius.Car.Rent.Management.System.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Employee {
    @Id
    @Column(name = "employee_ID", nullable = false, length = 10)
    private String employee_ID;

    @Column(name = "first_name", nullable = false, length = 250)
    private String first_name;

    @Column(name = "last_name", nullable = false, length = 200)
    private String last_name;

    @Column(name = "telephone_number", nullable = false, length = 20)
    private String telephoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "position", nullable = false, length = 100)
    private positionWorker position;

    @JsonIgnore
    @OneToMany(mappedBy = "employee", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<Rental> rentals;

    @ManyToOne
    @JoinColumn(name = "location_id")
    @JsonIgnoreProperties("test")
    private Location location;

    @JsonIgnore
    @OneToMany(mappedBy = "employee", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<Maintenance> maintenances;

    // Getters and Setters
    public String getEmployee_ID() {
        return employee_ID;
    }

    public void setEmployee_ID(String employee_ID) {
        this.employee_ID = employee_ID;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public positionWorker getPosition() {
        return position;
    }

    public void setPosition(positionWorker position) {
        this.position = position;
    }

    public List<Rental> getRentals() {
        return rentals;
    }

    public void setRentals(List<Rental> rentals) {
        this.rentals = rentals;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Maintenance> getMaintenances() {
        return maintenances;
    }

    public void setMaintenances(List<Maintenance> maintenances) {
        this.maintenances = maintenances;
    }
}

