package com.Lyse.Marius.Car.Rent.Management.System.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.Lyse.Marius.Car.Rent.Management.System.Model.Rental;
import org.springframework.data.jpa.repository.Query;

public interface RentalRepository extends JpaRepository<Rental, Integer> {

    @Query("FROM  Rental e")
    List<Rental> getAllRentalData();

}
