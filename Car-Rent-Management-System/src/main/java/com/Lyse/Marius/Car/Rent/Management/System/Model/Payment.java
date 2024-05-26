package com.Lyse.Marius.Car.Rent.Management.System.Model;

// import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression.DateTime;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentID", unique = true, nullable = false, length = 10)
    private Integer payment_ID;
    @Column(name = "payment_date", unique = false, nullable = false, length = 100)
    private DateTime payment_date;
    @Column(name = "payment_method", unique = false, nullable = false, length = 200)
    private paymentMethodEnum payment_method;

    @OneToOne
    @JoinColumn(name = "rental_id")
    private Rental rental;

    @Column(name = "amount_paid", unique = false, nullable = false, length = 20)
    private int amount_paid;

    public Integer getPayment_ID() {
        return payment_ID;
    }

    public void setPayment_ID(Integer payment_ID) {
        this.payment_ID = payment_ID;
    }

    public DateTime getPayment_date() {
        return payment_date;
    }

    public void setPayment_date(DateTime payment_date) {
        this.payment_date = payment_date;
    }

    public paymentMethodEnum getPayment_method() {
        return payment_method;
    }

    public void setPayment_method(paymentMethodEnum payment_method) {
        this.payment_method = payment_method;
    }

    public int getAmount_paid() {
        return amount_paid;
    }

    public void setAmount_paid(int amount_paid) {
        this.amount_paid = amount_paid;
    }

    public Rental getRental() {
        return rental;
    }

    public void setRental(Rental rental) {
        this.rental = rental;
    }

}
