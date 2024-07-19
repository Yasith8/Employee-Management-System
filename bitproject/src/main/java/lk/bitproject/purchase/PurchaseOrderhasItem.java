package lk.bitproject.purchase;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lk.bitproject.item.Item;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "purchaseorder_has_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrderhasItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Integer id;

    @NotNull
    private BigDecimal unit_price;

    
    @NotNull
    private BigDecimal qty;


    
    @NotNull
    private BigDecimal line_price;

    @ManyToOne
    @JoinColumn(name = "purchaseorder_id", referencedColumnName = "id")
    @JsonIgnore
    private PurchaseOrder purchaseorder_id;
    
    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private Item item_id;

}
