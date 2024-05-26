package com.Lyse.Marius.Car.Rent.Management.System.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
// import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
public class Location {
    @Id
    @Column(name = "location_ID", unique = true, nullable = false, length = 10)
    private String location_ID;

    @Column(name = "address", unique = false, nullable = false, length = 50)
    private String address;

    @Column(name = "phoneNumber", unique = true, nullable = false, length = 20)
    private String contact_information;

    @Column(name = "operating_hours", unique = true, nullable = false, length = 50)
    private String operating_hours;

    @JsonIgnore
    // @OneToMany(mappedBy = "location", cascade = CascadeType.REMOVE)
    @OneToMany(mappedBy = "location", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<Employee> employees;

    public String getLocation_ID() {
        return location_ID;
    }

    public void setLocation_ID(String location_ID) {
        this.location_ID = location_ID;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContact_information() {
        return contact_information;
    }

    public void setContact_information(String contact_information) {
        this.contact_information = contact_information;
    }

    public String getOperating_hours() {
        return operating_hours;
    }

    public void setOperating_hours(String operating_hours) {
        this.operating_hours = operating_hours;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }
}

// package com.Lyse.Marius.Car.Rent.Management.System.Model;

// import java.util.List;

// import jakarta.persistence.*;

// @Entity
// public class Location {
// @Id
// @Column(name = "location_ID", unique = true, nullable = false, length = 10)
// private String location_ID;
// @Column(name = "address", unique = false, nullable = false, length = 50)
// private String address;
// @Column(name = "phoneNumber", unique = true, nullable = false, length = 20)
// private String contact_information;
// @Column(name = "operating_hours", unique = true, nullable = false, length =
// 50)
// private String operating_hours;

// @OneToMany(mappedBy = "location", cascade = CascadeType.REMOVE)
// private List<Employee> employee;

// public String getLocation_ID() {
// return location_ID;
// }

// public void setLocation_ID(String location_ID) {
// this.location_ID = location_ID;
// }

// public String getAddress() {
// return address;
// }

// public void setAddress(String address) {
// this.address = address;
// }

// public String getContact_information() {
// return contact_information;
// }

// public void setContact_information(String contact_information) {
// this.contact_information = contact_information;
// }

// public String getOperating_hours() {
// return operating_hours;
// }

// public void setOperating_hours(String operating_hours) {
// this.operating_hours = operating_hours;
// }

// public List<Employee> getEmployee() {
// return employee;
// }

// public void setEmployee(List<Employee> employee) {
// this.employee = employee;
// }
// }
