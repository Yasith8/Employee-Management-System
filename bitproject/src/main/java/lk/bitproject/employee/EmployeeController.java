package lk.bitproject.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.el.ELException;

import java.util.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController // implemented mapping availeble for use
// add implemented mapping to servelet container for use

// define mapping for employee ui [/employee]
public class EmployeeController {

    // create variable employeedao
    @Autowired // inject employee dao instance into dao variable
    private EmployeeDao dao;

    @Autowired
    private EmployeeStatusDao daoStatus;

    @RequestMapping(value = "/employee")
    public ModelAndView empUI() {
        ModelAndView empView = new ModelAndView(); // for return ui
        empView.setViewName("employee - 5.html");
        return empView;
    }

    // define mapping for get all employee data [/employee/getall]
    // produce-->data return format
    // @requestMapping(value="/employee/alldata",produces='application.json',method=RequestMethod.GET)
    @GetMapping(value = "/employee/alldata", produces = "application/json")
    public List<Employee> allEmployeeData() {
        return dao.findAll();
    }


  
    

    // postMapping
    // define post mapping for saving employee records
    @PostMapping(value = "/employee")
    public String addEmployee(@RequestBody Employee employee) { // request bodyRequest
        // TAuthentication and Autherization

        // check duplicates

        Employee extEmployeeByNic = dao.getByNic(employee.getNic());

        if (extEmployeeByNic != null) {
            return "Save not completed : given " + employee.getNic() + " Already Exist...!";
        }

        // check duplicate email
        Employee extEmployeeEmail = dao.getByEmail(employee.getEmail());
        if (extEmployeeEmail != null) {
            return "Save not Completed : Given " + employee.getEmail() + " Already Exist...!";
        }

        try {
            // set auto genarated value
            String nextNumber = dao.getNextEmployeeNumber();

            if (nextNumber == null) {
                employee.setEmpno("012");
            } else {

                employee.setEmpno(nextNumber);
            }

            dao.save(employee);/// save employee object(insert given employee object --> run insert query)
            return "OK";

        } catch (Exception e) {
            return "Save not completed :" + e.getMessage();
        }
    }

    @DeleteMapping(value = "/employee")
    public String deleteEmployee(@RequestBody Employee employee) {

        // authentication and autherization

        // existing
        Employee extEmployee = dao.getReferenceById(employee.getId());

        if (extEmployee == null) {
            return "Delete Not Completed! Employee Not Exist...!";
        }

        try {
            // hard delete
            // dao.delete(employee)
            dao.delete(dao.getReferenceById(employee.getId()));

            // soft delete
            EmployeeStatus deleteStatus = daoStatus.getReferenceById(3);
            extEmployee.setEmployeestatus_id(deleteStatus);
            dao.save(extEmployee);

            // operation

            return "OK";

        } catch (Exception e) {
            return "Delete Not Completed: " + e.getMessage();
        }
    }

    // put mappping

    @PutMapping(value = "/employee")
    public String updateEmployee(@RequestBody Employee employee) {

        // authetication and autherization

        // duplicates and existing

        // get exisitng employee obejct getReferencebyId function -->used employee PK

        Employee extEmployee = dao.getReferenceById(employee.getId());
        if (extEmployee == null) {
            return "Update Not Completed: Employee Not Available...!";
        }

        // employee data typed variable caalled extEmployee assign to employee nic
        // number from database
        Employee extEmployeebyNic = dao.getByNic(employee.getNic());
        // if
        if (extEmployeebyNic != null && extEmployeebyNic.getId() != employee.getId()) {
            return "Update Not Completed: Chnage" + employee.getNic() + "--> Change NIC Already Exists...!";
        }

        Employee extEmployeebyEmail = dao.getByEmail(employee.getEmail());
        if (extEmployeebyEmail != null && extEmployeebyEmail.getId() != employee.getId()) {
            return "Update Not Completed: Chnage" + employee.getEmail() + "--> Change Email Already Exists...!";
        }

        try {

            // set auto set value

            // operator
            dao.save(employee);

            // dependences

            return "OK";
        } catch (Exception e) {
            return "Update Not Completed: " + e.getMessage();
        }
    }



      @GetMapping(value = "/employee/listwithoutuseraccount",produces = "application/json")
      public List<Employee> getEmployeewithoutUserAccount(){
        return dao.getListByWithoutUserAccount();
      }






}
