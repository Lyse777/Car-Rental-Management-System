package com.Lyse.Marius.Car.Rent.Management.System.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Lyse.Marius.Car.Rent.Management.System.Model.EmailDetails;
import com.Lyse.Marius.Car.Rent.Management.System.Model.User;
import com.Lyse.Marius.Car.Rent.Management.System.Repository.UserRepository;
import com.Lyse.Marius.Car.Rent.Management.System.SecurityConfig.JwtProvider;
import com.Lyse.Marius.Car.Rent.Management.System.response.AuthResponse;
import com.Lyse.Marius.Car.Rent.Management.System.service.EmailService;
import com.Lyse.Marius.Car.Rent.Management.System.service.UserServiceImplementation;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserServiceImplementation customUserDetails;

    @CrossOrigin("*")
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String mobile = user.getMobile();
        String role = user.getRole();

        User isEmailExist = userRepository.findByEmail(email);
        if (isEmailExist != null) {
            AuthResponse authResponse = new AuthResponse();
            authResponse.setMessage("Email is already used with another account");
            authResponse.setStatus(false);
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        }

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setFullName(fullName);
        createdUser.setMobile(mobile);
        createdUser.setRole(role);
        createdUser.setPassword(passwordEncoder.encode(password));

        @SuppressWarnings("unused")
        User savedUser = userRepository.save(createdUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = JwtProvider.generateToken(authentication);

        // Send the email upon successful signup
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(email);
        emailDetails.setSubject("Registration Successful");
        emailDetails.setMsgBody("You have successfully registered to Car Rental.");
        emailService.sendSimpleMail(emailDetails);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");
        authResponse.setStatus(true);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody User loginRequest) {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.generateToken(authentication);

        User user = userRepository.findByEmail(username);

        // Send the email upon successful login
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(user.getEmail());
        emailDetails.setSubject("Login Successful");
        emailDetails.setMsgBody("You have successfully logged into Car Rental.");
        emailService.sendSimpleMail(emailDetails);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Login success");
        authResponse.setJwt(token);
        authResponse.setStatus(true);
        authResponse.setRole(user.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username and password");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
