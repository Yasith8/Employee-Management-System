package lk.bitproject.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import lk.bitproject.supplier.SupplierHasItem;

import java.util.*;

public interface ItemDao extends JpaRepository<Item,Integer> {
    
//select i.id,i.itemname from items as i where i.id not in(select sup.item_id from SupplierHasItem sup sup.supplier_id=?1)
    @Query(value = "select i from Item i where i.id not in (select sup.item_id.id from SupplierHasItem sup where sup.supplier_id.id=?1)")
    List<Item> listWithoutSupplier(int supplierid);
} 

