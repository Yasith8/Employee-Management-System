package lk.bitproject.privilage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;


@RestController
public class PrivilageController {

    
    @Autowired
    private PrivilageDao dao;

    @RequestMapping(value = "/privilage")
    public ModelAndView privUi(){
        ModelAndView prvview=new ModelAndView();
        prvview.setViewName("privilage.html");
        return prvview;
    }

    @GetMapping(value="/privilage/alldata",produces = "application/json")
    public List<Privilage> allEmployeeData(){
        return dao.findAll();
    }
}
