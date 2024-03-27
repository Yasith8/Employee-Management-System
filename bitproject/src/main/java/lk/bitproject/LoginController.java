package lk.bitproject;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.bitproject.employee.EmployeeDao;
import lk.bitproject.privilage.Role;
import lk.bitproject.privilage.RoleDao;
import lk.bitproject.user.User;
import lk.bitproject.user.UserDao;
import java.time.LocalDateTime;

import java.util.*;



@RestController
public class LoginController {

    @Autowired
    private UserDao dao;

    @Autowired
    private EmployeeDao daoEmp;

    @Autowired
    private RoleDao daoRole;

    @Autowired
    private BCryptPasswordEncoder BCryptPasswordEncoder;

    @RequestMapping(value = "/login")
    public ModelAndView logInUI() {
        ModelAndView loginView = new ModelAndView(); // for return ui
        loginView.setViewName("login.html");
        return loginView;
    }


    @RequestMapping(value = "/dashboard")
    public ModelAndView dashboardUI() {
        ModelAndView dashboardView = new ModelAndView(); // for return ui
        dashboardView.setViewName("dashboard.html");
        return dashboardView;
    }


    @GetMapping(value = "/createadmin")
    public String genarateAdmin(){

        User extUser=dao.getbyUsername("Admin");
        if(extUser==null){

            User adminUser=new User();
            
            adminUser.setUsername("Admin");
            adminUser.setPassword(BCryptPasswordEncoder.encode("1234"));
            adminUser.setEmail("admin@thalpitiyaclinic.lk");
        adminUser.setAdded_datetime(LocalDateTime.now());
        adminUser.setStatus(true);
        
        adminUser.setEmployee_id(daoEmp.getReferenceById(22));
        adminUser.setRoles(null);
        
        Set<Role> userRoles= new HashSet<>();
        userRoles.add(daoRole.getReferenceById(1));
        adminUser.setRoles(userRoles);
        
        
        dao.save(adminUser);
        
    }
        return "<script>window.location.replace('/login');</script>";
    }

}

