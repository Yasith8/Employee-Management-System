package lk.bitproject.supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.bitproject.privilage.Privilage;
import lk.bitproject.privilage.PrivilageController;
import lk.bitproject.user.User;
import lk.bitproject.user.UserDao;

import java.util.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.time.*;

@RestController
public class SupplierController {
    
    @Autowired
    private SupplierDao dao;

    @Autowired
    private UserDao daoUser;

    private PrivilageController privilageController=new PrivilageController();


    @RequestMapping(value = "/supplier")
    public ModelAndView supplierUI() {
        //get log user authenication object using security
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        ModelAndView supView = new ModelAndView(); // for return ui
        supView.addObject("title", "Supplier Management");
        supView.addObject("User", authentication.getName());
        supView.setViewName("supplier.html");
        return supView;
    }


    @GetMapping(value = "/supplier/alldata",produces = "application/json")
    public List<Supplier> allSuplierData(){
        return dao.findAll();
    }


    @PostMapping(value = "/supplier")
    public String saveSupllier(@RequestBody Supplier supplier) {

        //authenticcation and autherization
        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage=privilageController.getPrivilageByUserModule(auth.getName(), "Employee");

        if(!userPrivilage.getInsprv()){
            return "Permission Denied! save not completed!";
        }

        //check Duplicate
        Supplier extSupplierByName=dao.getBySupplierName(supplier.getName());
        if (extSupplierByName != null){
            return "Save not Completed: Already Existed";
        }


        try {
            supplier.setAddeddatetime(LocalDateTime.now());
            User loggedUser=daoUser.getbyUsername(auth.getName());
            supplier.setAddeduser_id((loggedUser.getId()));
            

            String nextNumber=dao.getNextSupplierNumber();

            if(nextNumber.equals(null)){
                nextNumber="S"+LocalDate.now().getYear()+"0001";
            }

            supplier.setRegno(null);

            dao.save(supplier);
            return "OK";
            
        } catch (Exception e) {
            return   "Error Occurred : "+e.getMessage();
        }
    }
    

}
 