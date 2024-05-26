package com.Lyse.Marius.Car.Rent.Management.System.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {

}
