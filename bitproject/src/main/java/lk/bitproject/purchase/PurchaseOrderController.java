package lk.bitproject.purchase;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class PurchaseOrderController {

    @Autowired
    private PurchaseOrderDao porderdao;


    @GetMapping(value = "/purchaseorder/alldata", produces = "application/json")
    public List<PurchaseOrder> allPurchaseOrderData() {

        return porderdao.findAll();
    }


    @RequestMapping(value="/porderform")
    public ModelAndView porderform(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();

        ModelAndView porderformView=new ModelAndView();
        porderformView.addObject("titile", "Purchase Order Management");
        porderformView.addObject("logedUser", authentication.getName());
        porderformView.setViewName("porderform.html");

        return porderformView;
    }
    
    @RequestMapping(value="/pordertable")
    public ModelAndView porderTable(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();

        ModelAndView porderTableView=new ModelAndView();
        porderTableView.addObject("titile", "Purchase Order Management");
        porderTableView.addObject("logedUser", authentication.getName());
        porderTableView.setViewName("pordertable.html");

        return porderTableView;
    }
}
