package lk.bitproject.supplier;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lk.bitproject.item.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.*;


@Entity  
@Table(name = "supplier")
@Data
@NoArgsConstructor  
@AllArgsConstructor 
public class Supplier {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name="id",unique=true)
    private Integer id; 

    @Column(name="regno",unique = true)
    @NotNull
    private String regno;

    @Column(name="name")
    @NotNull
    private String name;

    @Column(name="addeduser_id")
    @NotNull
    private Integer addeduser_id;
    
    
    @Column(name="addeddatetime")
    @NotNull
    private LocalDateTime addeddatetime;

    @Column(name="updateuser_id")
    @NotNull
    private Integer updateuser_id;
    
    
    @Column(name="updatedatetime")
    @NotNull
    private LocalDateTime updatedatetime;

    
    @Column(name="deleteuser_id")
    @NotNull
    private Integer deleteuser_id;
    
    
    @Column(name="deletedatetime")
    @NotNull
    private LocalDateTime deletedatetime;
    
    @ManyToOne    
    @JoinColumn(name="supplierstatus_id",referencedColumnName = "id") 
    private SupplierStatus supplierstatus_id;
    
    @ManyToMany
    @JoinTable(name = "supplier_has_item",joinColumns=@JoinColumn(name="supplier_id"),inverseJoinColumns =@JoinColumn(name = "item_id"))
    private Set<Item> supplyItems;


}
