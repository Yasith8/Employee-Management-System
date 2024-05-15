package lk.bitproject.supplier;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierDao extends JpaRepository<Supplier,Integer>{

    @Query("select s from Supplier s where s.name=?1")
    Supplier getBySupplierName(String suppliername);

    @Query(value = "SELECT concat('S',year(current_date()),lpad(substring(max(s.regno),5)+1,4,0)) FROM bitproject.supplier as s where year(s.addeddatetime)=year(current_date())", nativeQuery = true)
	String getNextSupplierNumber();
} 
