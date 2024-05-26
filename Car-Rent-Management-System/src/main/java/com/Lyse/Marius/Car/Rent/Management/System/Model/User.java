package com.Lyse.Marius.Car.Rent.Management.System.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "User")
public class User {
    @Id
    @Column(name = "UserId", nullable = false, length = 10)
    private String User_id;
    @Column(name = "LastName", nullable = false, length = 255)
    private String LastName;
    @Column(name = "FirstName", nullable = false, length = 255)
    private String FirstName;
    @Column(name = "Email", nullable = false, length = 200)
    private String Email;
    @Column(name = "Postion", nullable = false, length = 100)
    @Enumerated(EnumType.STRING)
    private Users Postion;

    public String getUser_id() {
        return User_id;
    }

    public void setUser_id(String user_id) {
        User_id = user_id;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public String getFirstName() {
        return FirstName;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public Users getPostion() {
        return Postion;
    }

    public void setPostion(Users postion) {
        Postion = postion;
    }

}
