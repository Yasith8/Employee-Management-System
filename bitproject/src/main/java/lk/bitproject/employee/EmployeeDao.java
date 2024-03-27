package lk.bitproject.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;



public interface EmployeeDao extends JpaRepository<Employee,Integer> {
    String findAll=null;

     // Query
    // 1 native query
   // native walata adala ewwa jpa wala na.. samahara native query options jpa wala na 

   //2.JPA Query --default

   //create query for get employee y given nic value
   @Query("select e from Employee e where e.nic=?1")
    public Employee getByNic(String nic);


    //create query for get employee y given email value
   @Query("select e from Employee e  where e.email=?1")
    public Employee getByEmail(String email);

    //create query for get next employee number
    @Query(value = "select concat('E',lpad(substring(max(e.empno),2)+1,8,'0')) as EmpNo from bitproject.employee as e", nativeQuery = true)
    public String getNextEmployeeNumber();


    @Query(value="select e FROM Employee as e where e.id not in (select u.employee_id.id from User as u)")
    public List<Employee> getListByWithoutUserAccount();

    

    
} 
