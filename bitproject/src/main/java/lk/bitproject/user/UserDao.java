package lk.bitproject.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDao extends JpaRepository<User,Integer> {
//    String findAll=null;

    @Query("select u from User u where u.username=?1")
    public User getbyUsername(String username);

    @Query("select u from User u where u.email=?1")
    public User getByEmail(String email);

    @Query("select u from User u where u.employee_id=?1")
    public User getByEmployee(Integer employeeid);
} 
