package com.Lyse.Marius.Car.Rent.Management.System.Model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Employee {
    @Id
    @Column(name = "employee_ID", unique = true, nullable = false, length = 10)
    private String employee_ID;
    @Column(name = "First_name", unique = false, nullable = false, length = 250)
    private String First_name;
    @Column(name = "Last_name", unique = false, nullable = false, length = 200)
    private String Last_name;
    @Column(name = "TelephoneNumber", unique = true, nullable = false, length = 20)
    private String TelephoneNumber;
    @Column(name = "position", unique = false, nullable = false, length = 100)
    private positionWorker position;

    @OneToOne(mappedBy = "employee", cascade = CascadeType.REMOVE)
    private Rental rental;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.REMOVE)
    private List<Maintenance> maintenances;

    public String getEmployee_ID() {
        return employee_ID;
    }

    public void setEmployee_ID(String employee_ID) {
        this.employee_ID = employee_ID;
    }

    public String getFirst_name() {
        return First_name;
    }

    public void setFirst_name(String first_name) {
        First_name = first_name;
    }

    public String getLast_name() {
        return Last_name;
    }

    public void setLast_name(String last_name) {
        Last_name = last_name;
    }

    public String getTelephoneNumber() {
        return TelephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        TelephoneNumber = telephoneNumber;
    }

    public positionWorker getPosition() {
        return position;
    }

    public void setPosition(positionWorker position) {
        this.position = position;
    }

    public Rental getRental() {
        return rental;
    }

    public void setRental(Rental rental) {
        this.rental = rental;
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
