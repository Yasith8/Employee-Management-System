package lk.bitproject.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class ItemController {
    

    @RequestMapping("/item")
    public ModelAndView itemUI() {
        ModelAndView itemView=new ModelAndView();
        itemView.setViewName("item.html");
        return itemView;
    }
    
}
