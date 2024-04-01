package lk.bitproject.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;



import java.util.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.time.LocalDateTime;

@RestController
public class UserController {

     
    @Autowired
    private UserDao dao;

    @RequestMapping(value="/user")
	public ModelAndView userUi(){
		ModelAndView userView=new ModelAndView();
        userView.addObject("title", "User Management");
        userView.addObject("user", "Kamal5");
		userView.setViewName("user.html");
		return userView;
	}

     @GetMapping(value="/user/alldata",produces = "application/json")
    public List<User> allEmployeeData(){
        return dao.findAll();
    }

 /*    @PostMapping(value="/user")
    public String addUser(@RequestBody User user) {
        try {
             //set auto genarated value
        user.setUserno("006");
        dao.save(user);
        return "OK";
        } catch (Exception e) {
            return "Save not completed :" + e.getMessage();
        }
        
        
    } */
    

    @PostMapping(value = "/user")
    public String insertUser(@RequestBody User user){
        //authentication & autherization

        //check duplication
        User extUserByEmail=dao.getByEmail(user.getEmail());
        if(extUserByEmail!=null){
            return "Save not completed : given "+user.getEmail()+" Already Exist...!";
        }

        //check employee existing
        User extUserByEmployee=dao.getByEmployee(user.getEmployee_id().getId());
        if(extUserByEmployee!=null){
            return "Save Not Completed : Employee Already Exist...!";
        }
        try {

            //set auto genarated value
            user.setAdded_datetime(LocalDateTime.now());


            //operator

            //dependencies
        
            

            return "OK";
        } catch (Exception e) {
            
            return "Save Not Completed : "+e.getMessage();
        }
    }
    

    @DeleteMapping(value = "/user")
    public String deleteUser(@RequestBody User user){
        //authentication and autherization

        //existing check

        try {
            //hard delete
            //dao.delete(employee)
            dao.delete(dao.getReferenceById(user.getId()));

            //soft delete

            //operation

            return "OK";
        } catch (Exception e) {
            return "Delete not Completed : "+e.getMessage();
        }
    }


    @PutMapping(value="/user")
    public String updateUser(@RequestBody User user){

        User extUser=dao.getReferenceById(user.getId());

        if(extUser==null){
            return "Update not completed: User not Exist";
        }

        User extUserEmail=dao.getByEmail((user.getEmail()));

        if(extUserEmail!=null){
            
        }

        try {

            //operation
            dao.save(user);

            //dependencies
            return "OK";
        } catch (Exception e) {
            return "Update not Completed : "+e.getMessage();
        }
    }


 
}
