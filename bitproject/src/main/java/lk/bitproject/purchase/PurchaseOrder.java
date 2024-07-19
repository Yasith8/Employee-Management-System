package lk.bitproject.purchase;

import java.time.LocalDate;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lk.bitproject.item.Item;
import lk.bitproject.supplier.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.*;

import java.util.*;

@Entity
@Table(name = "purchaseorder")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "pordercode")
    @NotNull
    private String pordercode;

    @Column(name = "requireddate")
    @NotNull
    private LocalDate requireddate;

    @Column(name = "totalamount")
    @NotNull
    private BigDecimal totalamount;

    @Column(name = "note")
    private String note;

    @Column(name = "addeduser_id")
    private Integer addeduser_id;

    @Column(name = "addeddatetime")
    private LocalDate addeddatetime;

    @Column(name = "updateuser_id")
    private Integer updateuser_id;

    @Column(name = "updatedatetime")
    private LocalDate updatedatetime;

    @Column(name = "deleteuser_id")
    private Integer deleteuser_id;

    @Column(name = "deletedatetime")
    private LocalDate deletedatetime;

    @ManyToOne
    @JoinColumn(name = "porderstatus_id", referencedColumnName = "id")
    private Porderstatus porderstatus_id;

   /*  @ManyToMany
    @JoinTable(name = "purchaseorder_has_item", joinColumns = @JoinColumn(name = "purchaseorder_id"), inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<Item> supplyitems;
 */
    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Supplier supplier_id;

    @OneToMany(mappedBy = "purchaseorder_id")
    private List<PurchaseOrderhasItem> purchaseorderhasitem;

    
}
