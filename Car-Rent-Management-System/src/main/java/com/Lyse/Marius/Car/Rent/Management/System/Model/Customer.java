package com.Lyse.Marius.Car.Rent.Management.System.Model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Customer {
    @Id
    @Column(name = "customer_ID", nullable = false, length = 10)
    private String customer_ID;
    @Column(name = "First_name", nullable = false, length = 255)
    private String First_name;
    @Column(name = "Last_name", nullable = false, length = 255)
    private String Last_name;
    @Column(name = "phoneNumber", nullable = false, length = 20)
    private String contact_information;
    @Column(name = "Email", nullable = false, length = 50)
    private String Email;
    @Column(name = "address", nullable = false, length = 255)
    private String address;
    @Column(name = "driving_license_number", nullable = false, length = 250)
    private String driving_license_number;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.REMOVE)
    private List<Rental> rental;

    public String getCustomer_ID() {
        return customer_ID;
    }

    public void setCustomer_ID(String customer_ID) {
        this.customer_ID = customer_ID;
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

    public String getContact_information() {
        return contact_information;
    }

    public void setContact_information(String contact_information) {
        this.contact_information = contact_information;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDriving_license_number() {
        return driving_license_number;
    }

    public void setDriving_license_number(String driving_license_number) {
        this.driving_license_number = driving_license_number;
    }

    public List<Rental> getRental() {
        return rental;
    }

    public void setRental(List<Rental> rental) {
        this.rental = rental;
    }

}
