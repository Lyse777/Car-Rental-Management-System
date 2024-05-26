package com.Lyse.Marius.Car.Rent.Management.System.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Rental;

public interface RentalRepository extends JpaRepository<Rental, Integer> {

}
