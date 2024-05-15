package lk.bitproject.privilage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;



import java.util.*;


@RestController
public class PrivilageController {

    
    @Autowired
    private static PrivilageDao dao;

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


    //@GetMapping(value="/privilage/bymodule",params = {modulename},produces = "application/json")
    @GetMapping(value="/privilage/bymodule/{modulename}",produces = "application/json")
    public Privilage allEmployeeByModule(@PathVariable("modulename") String modulename){
        //return dao.getPrivilageByUserModule();
        
        //get log user authentication object using security context holder
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        return getPrivilageByUserModule(authentication.getName(), modulename);
        
       
        
    }
    
    
    //define function for get privilage by logged user and given module
    public Privilage getPrivilageByUserModule(String username,String modulename){
        if(username.equals("Admin")){
            Privilage adminPriv=new Privilage(true,false,true,false);
            return adminPriv;
        }else{
            String privi = dao.getPrivilageByUserModule(username,modulename);
            String[] priviArray=privi.split(",");

            Boolean select=priviArray[0].equals("1");
            Boolean insert=priviArray[1].equals("1");
            Boolean update=priviArray[2].equals("1");
            Boolean delete=priviArray[3].equals("1");
            Privilage userPriv=new Privilage(select,insert,update,delete);
            
            return userPriv;
        }
    }

}
