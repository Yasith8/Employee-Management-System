package lk.bitproject.employee;


import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeStatusController {
    

    @Autowired
    private EmployeeStatusDao dao;

    @GetMapping(value="/employeestatus/alldata",produces = "application/json")
    public List<EmployeeStatus> getAllDataList(){
        return dao.findAll();
    }
}
