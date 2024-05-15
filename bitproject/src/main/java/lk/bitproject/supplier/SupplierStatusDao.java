package lk.bitproject.supplier;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierStatusDao extends JpaRepository<SupplierStatus,Integer>{
    

}
