package lk.bitproject.privilage;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "privilage")

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Privilage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true)
    private int id;

    @Column(name = "insprv")
    private int insprv;

    @Column(name = "updprv")
    private int updprv; 

    @Column(name = "selprv")
    private int selprv; 

    @Column(name = "delprv")
    private int delprv; 


    @ManyToOne
    @JoinColumn(name = "role_id",referencedColumnName="id")
    private Role role_id;

    @ManyToOne
    @JoinColumn(name = "module_id",referencedColumnName="id")
    private Module module_id;
}
