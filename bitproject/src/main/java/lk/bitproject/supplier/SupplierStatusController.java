package lk.bitproject.supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
public class SupplierStatusController {
    
    @Autowired
    private SupplierStatusDao dao;

    @GetMapping(value = "/supplierstatus/findall", produces = "application/json")
    public List<SupplierStatus> allEmployeeData() {
        return dao.findAll();
    }
}
