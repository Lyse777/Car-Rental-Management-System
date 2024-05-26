package com.Lyse.Marius.Car.Rent.Management.System.Model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentID", unique = true, nullable = false)
    private Integer payment_ID;

    @Column(name = "payment_date", nullable = false)
    private Date payment_date;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private paymentMethodEnum payment_method;

    @OneToOne
    @JoinColumn(name = "rental_id")
    @JsonIgnoreProperties("payment") // Prevent infinite recursion for Rental
    private Rental rental;

    @Column(name = "amount_paid", nullable = false)
    private int amount_paid;

    public Integer getPayment_ID() {
        return payment_ID;
    }

    public void setPayment_ID(Integer payment_ID) {
        this.payment_ID = payment_ID;
    }

    public Date getPayment_date() {
        return payment_date;
    }

    public void setPayment_date(Date payment_date) {
        this.payment_date = payment_date;
    }

    public paymentMethodEnum getPayment_method() {
        return payment_method;
    }

    public void setPayment_method(paymentMethodEnum payment_method) {
        this.payment_method = payment_method;
    }

    public Rental getRental() {
        return rental;
    }

    public void setRental(Rental rental) {
        this.rental = rental;
    }

    public int getAmount_paid() {
        return amount_paid;
    }

    public void setAmount_paid(int amount_paid) {
        this.amount_paid = amount_paid;
    }

}

// package com.Lyse.Marius.Car.Rent.Management.System.Model;
// import java.sql.Date;

// import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

// import jakarta.persistence.*;

// @Entity
// public class Payment {
// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// @Column(name = "paymentID", unique = true, nullable = false)
// private Integer payment_ID;

// @Column(name = "payment_date", nullable = false)
// private Date payment_date;

// @Enumerated(EnumType.STRING)
// @Column(name = "payment_method", nullable = false)
// private paymentMethodEnum payment_method;

// public Integer getPayment_ID() {
// return payment_ID;
// }

// public void setPayment_ID(Integer payment_ID) {
// this.payment_ID = payment_ID;
// }

// public Date getPayment_date() {
// return payment_date;
// }

// public void setPayment_date(Date payment_date) {
// this.payment_date = payment_date;
// }

// public paymentMethodEnum getPayment_method() {
// return payment_method;
// }

// public void setPayment_method(paymentMethodEnum payment_method) {
// this.payment_method = payment_method;
// }

// public Rental getRental() {
// return rental;
// }

// public void setRental(Rental rental) {
// this.rental = rental;
// }

// public int getAmount_paid() {
// return amount_paid;
// }

// public void setAmount_paid(int amount_paid) {
// this.amount_paid = amount_paid;
// }

// @OneToOne
// @JoinColumn(name = "rental_id")
// private Rental rental;

// @Column(name = "amount_paid", nullable = false)
// private int amount_paid;

// }
