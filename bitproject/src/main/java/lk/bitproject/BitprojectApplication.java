package lk.bitproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
@RestController
public class BitprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(BitprojectApplication.class, args);
		System.out.println("Hello World");
	}

	@RequestMapping(value = "/")
	public String index(){
		System.out.println("Hello");
		return "<h1 style='color:green'>Hello Green</h1>";
	}
	
	@RequestMapping(value="/testui")
	public ModelAndView testUi(){
		ModelAndView testview=new ModelAndView();
		testview.setViewName("test.html");
		return testview;
	}

	@RequestMapping(value ="/cat")
	public ModelAndView catUi(){
		ModelAndView catView=new ModelAndView();
		catView.setViewName("cat.html");
		return catView;
	}

	
}
