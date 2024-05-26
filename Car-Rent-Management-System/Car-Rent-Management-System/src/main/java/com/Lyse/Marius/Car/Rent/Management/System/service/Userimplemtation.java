package com.Lyse.Marius.Car.Rent.Management.System.service;


import java.util.List;

import com.Lyse.Marius.Car.Rent.Management.System.Model.User;

public class Userimplemtation implements UserService {

    @Override
    public List<User> getAllUser() {
        return List.of();
    }

    @Override
    public User findUserProfileByJwt(String jwt) {

        return null;
    }

    @Override
    public User findUserByEmail(String email) {
        return null;

    }

    @Override
    public User findUserById(String userId) {
        return null;
    }

    @Override
    public List<User> findAllUsers() {
        return List.of();
    }

}
