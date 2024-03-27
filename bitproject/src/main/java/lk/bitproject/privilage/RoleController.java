package lk.bitproject.privilage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

@RestController
public class RoleController{
    

    @Autowired
    private RoleDao dao;


    @GetMapping(value = "/role/listwithoutadmin",produces = "application/json")
    public List<Role> getRoleWithoutAdmin() {
        return dao.getListWithoutAdmin();
    }


    
}
