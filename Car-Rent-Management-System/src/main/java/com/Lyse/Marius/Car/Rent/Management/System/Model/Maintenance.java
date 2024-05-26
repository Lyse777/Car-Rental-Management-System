package com.Lyse.Marius.Car.Rent.Management.System.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression.DateTime;

@Entity
public class Maintenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "M_ID", unique = true, nullable = false, length = 20)
    private int maintenance_ID;
    @Column(name = "maintenance_type", unique = false, nullable = false, length = 200)
    private String maintenance_type;
    @Column(name = "maintenance_date", unique = false, nullable = false, length = 50)
    private DateTime maintenance_date;

    @OneToOne
    @JoinColumn(name = "car_id")
    private Car car;

    @Column(name = "maintenance_cost", unique = false, nullable = false, length = 50)
    private int maintenance_cost;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    public int getMaintenance_ID() {
        return maintenance_ID;
    }

    public void setMaintenance_ID(int maintenance_ID) {
        this.maintenance_ID = maintenance_ID;
    }

    public String getMaintenance_type() {
        return maintenance_type;
    }

    public void setMaintenance_type(String maintenance_type) {
        this.maintenance_type = maintenance_type;
    }

    public DateTime getMaintenance_date() {
        return maintenance_date;
    }

    public void setMaintenance_date(DateTime maintenance_date) {
        this.maintenance_date = maintenance_date;
    }

    public int getMaintenance_cost() {
        return maintenance_cost;
    }

    public void setMaintenance_cost(int maintenance_cost) {
        this.maintenance_cost = maintenance_cost;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

}
