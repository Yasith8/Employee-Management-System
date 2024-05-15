package lk.bitproject.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class WebConfiguration {
    
   /*  @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web)-> web.ignoring()

        //spring security dhould completely ignore srting url with"/rcourcrs/..."

        .requestMatchers("/resources/**");
    }
 */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        
        http
        //request filter
        .authorizeHttpRequests((request)->{
            request.requestMatchers("/createadmin").permitAll()//allow all request to access 
            .requestMatchers("/login").permitAll()//allow all request to access 
            .requestMatchers("/resources/**").permitAll()//allow all request to access 
            .requestMatchers("/dashboard").hasAnyAuthority("Admin","Manager","User","Cashier","Store-manager")//only allow admin, manager and user
            .requestMatchers("/employee/**").hasAnyAuthority("Admin","Manager")
            .requestMatchers("/user/**").hasAnyAuthority("Admin","Manager")
            .requestMatchers("/privilage/**").hasAnyAuthority("Admin","Manager")
            .requestMatchers("/supplier/**").hasAnyAuthority("Admin","Manager","Store-manager")
            .anyRequest().authenticated();//all other requests need authentication
        })
        //login filter
        .formLogin((login)->{
            login.loginPage("/login") //return login page
            .usernameParameter("username")//parameter name of username
            .passwordParameter("password")//parameter name of password
            .defaultSuccessUrl("/dashboard",true)
            .failureUrl("/login?error=invalidusernamepassword");
        })
        //logout filter
        .logout((logout)->{
            logout.logoutUrl("/logout")
            .logoutSuccessUrl("/login");

        })
        //crossitescript filter
        .csrf((csrf)->{
            csrf.disable();
        })
        //exception handling
        .exceptionHandling((exception)->{
            exception.accessDeniedPage("/errorpage");
        });
        
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
