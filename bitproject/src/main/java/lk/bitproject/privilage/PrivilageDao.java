package lk.bitproject.privilage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;



public interface PrivilageDao extends JpaRepository<Privilage,Integer> {
    

    @Query(value = "SELECT bit_or(p.selprv) as sel, bit_or(p.delprv) as del,bit_or(p.insprv) as ins, bit_or(p.updprv) as upd FROM bitproject.privilage as p where p.module_id in (select m.id from bitproject.module as m where m.name=?2) and p.role_id in (select uhr.role_id from bitproject.user_has_role as uhr where uhr.user_id in (select u.id from bitproject.user as u where u.username=?1));",nativeQuery = true)
    public String getPrivilageByUserModule(String username,String modulename);
} 
