package lk.bitproject.supplier;
package lk.bitproject.item;



import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lk.bitproject.item.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Table(name = "supplier_has_item")
@Data
@NoArgsConstructor  
@AllArgsConstructor 
public class SupplierHasItem {

    @Id
    @ManyToOne    
    @JoinColumn(name="supplier_id",referencedColumnName = "id") 
    private Supplier supplier_id;
    
    @Id
    @ManyToOne    
    @JoinColumn(name="item_id",referencedColumnName = "id") 
    private Item item_id;

    
}
