package lk.bitproject.privilage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilageDao extends JpaRepository<Privilage,Integer> {
    String findAll=null;
} 
