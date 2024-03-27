package lk.bitproject.employee;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DesignationController {
    

    @Autowired
    private DesignationDao dao;


    @GetMapping(value="/designation/alldata",produces = "application/json")
    public List<Designation> getAllDataList(){
        return dao.findAll();
    }
}
