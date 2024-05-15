package lk.bitproject.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.websocket.server.PathParam;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;


@RestController
public class ItemController {

    @Autowired
    private ItemDao dao;
    

    @RequestMapping("/item")
    public ModelAndView itemUI() {
        ModelAndView itemView=new ModelAndView();
        itemView.setViewName("item.html");
        return itemView;
    }

    @GetMapping(value = "/item/listbyavailable",produces="application/json")
    public List<Item> itemData() {
        return dao.findAll();
    }

    @GetMapping(value = "/item/listwithoutsupplier/{supplierid}",produces="application/json")
    public List<Item> withoutSupplierData(@PathVariable("supplierid") int supplierid) {
        return dao.listWithoutSupplier(supplierid);
    }
    
    
}
