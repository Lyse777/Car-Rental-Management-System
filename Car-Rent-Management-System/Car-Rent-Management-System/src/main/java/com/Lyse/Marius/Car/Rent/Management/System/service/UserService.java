package com.Lyse.Marius.Car.Rent.Management.System.service;

import java.util.List;

import com.Lyse.Marius.Car.Rent.Management.System.Model.User;


public interface UserService {

    public List<User> getAllUser();

    public User findUserProfileByJwt(String jwt);

    public User findUserByEmail(String email);

    public User findUserById(String userId);

    public List<User> findAllUsers();

}