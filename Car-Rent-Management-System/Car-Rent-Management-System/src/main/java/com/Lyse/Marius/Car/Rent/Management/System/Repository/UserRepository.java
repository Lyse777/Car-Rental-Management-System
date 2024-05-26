package com.Lyse.Marius.Car.Rent.Management.System.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

import com.Lyse.Marius.Car.Rent.Management.System.Model.User;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}

