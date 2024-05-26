package com.Lyse.Marius.Car.Rent.Management.System.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
// import org.springframework.stereotype.Component; // Import Spring Component annotation

@Data
@AllArgsConstructor
@NoArgsConstructor
// @Component
public class EmailDetails {

    private String recipient;
    private String msgBody;
    private String subject;
    // private String attachment;
}
