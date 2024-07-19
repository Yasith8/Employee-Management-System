package lk.bitproject.purchase;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseOrderDao extends JpaRepository<PurchaseOrder, Integer> {

}
