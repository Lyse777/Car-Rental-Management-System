package com.Lyse.Marius.Car.Rent.Management.System.Model;

import java.sql.Date;

import jakarta.persistence.CascadeType;
// import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Rental")
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rental_ID", nullable = false, length = 5)
    private int rental_ID;
    @Column(name = "rental_start_date", nullable = false, length = 20)
    private Date rental_start_date;
    @Column(name = "return_date", nullable = false, length = 20)
    private Date return_date;
    @Column(name = "Total_rental_cost", nullable = false, length = 20)
    private int total_rental_cost;
    @Column(name = "payment_status", nullable = false, length = 40)
    private String payment_status;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @OneToOne(mappedBy = "rental", cascade = CascadeType.PERSIST)
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    public int getRental_ID() {
        return rental_ID;
    }

    public void setRental_ID(int rental_ID) {
        this.rental_ID = rental_ID;
    }

    public Date getRental_start_date() {
        return rental_start_date;
    }

    public void setRental_start_date(Date rental_start_date) {
        this.rental_start_date = rental_start_date;
    }

    public Date getReturn_date() {
        return return_date;
    }

    public void setReturn_date(Date return_date) {
        this.return_date = return_date;
    }

    public int getTotal_rental_cost() {
        return total_rental_cost;
    }

    public void setTotal_rental_cost(int total_rental_cost) {
        this.total_rental_cost = total_rental_cost;
    }

    public String getPayment_status() {
        return payment_status;
    }

    public void setPayment_status(String payment_status) {
        this.payment_status = payment_status;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

}
