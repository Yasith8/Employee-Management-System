/* package lk.bitproject.item;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lk.bitproject.employee.Designation;
import lk.bitproject.employee.EmployeeStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity  
@Table(name = "item")

@Data
@NoArgsConstructor  
@AllArgsConstructor 

public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name="id",unique=true)
    private Integer id; 

    @Column(name="itemcode",unique = true)
    @NotNull
    private String itemcode;

    
    @Column(name="itemname")
    @NotNull
    private String itemname;
    
    @Column(name="purchaseprice")
    @NotNull
    private String purchaseprice; 
    
    @Column(name="note")
    @NotNull
    private String note;

    @Column(name="rop")
    @NotNull
    private String rop; 
    
    @Column(name="itemsize")
    @NotNull
    private String itemsize;
    
    
    @Column(name="addeddatetime")
    @NotNull
    private String addeddatetime; 


    @ManyToOne   //relationship format    
    @JoinColumn(name="unitype_id",referencedColumnName = "id")   //join column
    private UnitType unitype_id;

    @ManyToOne   //relationship format
    @JoinColumn(name="itemstatus_id",referencedColumnName = "id")     //join column
    private ItemStatus itemstatus_id;

    @ManyToOne   //relationship format    
    @JoinColumn(name="packagetype_id",referencedColumnName = "id")   //join column
    private PackageType packagetype_id;

    @ManyToOne   //relationship format
    @JoinColumn(name="brand_id",referencedColumnName = "id")     //join column
    private Brand brand_id;

    @ManyToOne   //relationship format
    @JoinColumn(name="subcategory_id",referencedColumnName = "id")     //join column
    private Subcategory subcategory_id;
}
 */