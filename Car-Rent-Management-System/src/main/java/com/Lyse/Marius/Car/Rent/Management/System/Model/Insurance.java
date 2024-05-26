package com.Lyse.Marius.Car.Rent.Management.System.Model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Insurance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IS_ID", unique = true, nullable = false, length = 10)
    private int insurance_ID;
    @Column(name = "coverage_type", unique = false, nullable = false, length = 200)
    private coverage_typeEnum coverage_type;
    @Column(name = "Insurance_company", unique = false, nullable = false, length = 200)
    private Insurance_companyEnum Insurance_company;
    @Column(name = "premium_amount", unique = false, nullable = false, length = 100)
    private int premium_amount;

    @OneToMany(mappedBy = "insurance", cascade = CascadeType.REMOVE)
    private List<Car> car;

    public int getInsurance_ID() {
        return insurance_ID;
    }

    public void setInsurance_ID(int insurance_ID) {
        this.insurance_ID = insurance_ID;
    }

    public coverage_typeEnum getCoverage_type() {
        return coverage_type;
    }

    public void setCoverage_type(coverage_typeEnum coverage_type) {
        this.coverage_type = coverage_type;
    }

    public Insurance_companyEnum getInsurance_company() {
        return Insurance_company;
    }

    public void setInsurance_company(Insurance_companyEnum insurance_company) {
        Insurance_company = insurance_company;
    }

    public int getPremium_amount() {
        return premium_amount;
    }

    public void setPremium_amount(int premium_amount) {
        this.premium_amount = premium_amount;
    }

    public List<Car> getCar() {
        return car;
    }

    public void setCar(List<Car> car) {
        this.car = car;
    }

}
