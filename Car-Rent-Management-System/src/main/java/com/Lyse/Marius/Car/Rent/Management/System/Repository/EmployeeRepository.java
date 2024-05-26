package com.Lyse.Marius.Car.Rent.Management.System.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Lyse.Marius.Car.Rent.Management.System.Model.Employee;
// import com.mysql.cj.x.protobuf.MysqlxDatatypes.Scalar.String;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

}
