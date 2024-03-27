package lk.bitproject.privilage;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;



public interface RoleDao extends JpaRepository<Role,Integer> {
    //String findAll=null;

    //create query to get roles without admin role
    @Query("select r from Role r where r.name <> 'Admin'")
    public List<Role> getListWithoutAdmin();
    
}
