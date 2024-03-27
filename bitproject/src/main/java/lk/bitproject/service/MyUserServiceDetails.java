package lk.bitproject.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lk.bitproject.privilage.Role;
import lk.bitproject.user.UserDao;

@Service
public class MyUserServiceDetails implements UserDetailsService {

    @Autowired
    private UserDao dao;

    @Override
    @Transactional //transtation annotated karanne nathuwa role access karanna ba
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //get user by using username
        lk.bitproject.user.User logedUser=dao.getbyUsername(username);

        System.out.println(logedUser.getUsername());

        
        ArrayList<GrantedAuthority> authorities= new ArrayList<>();
        for(Role role:logedUser.getRoles()){
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }

        return new User(logedUser.getUsername(), logedUser.getPassword(),logedUser.getStatus(), true, true, true, authorities);

    
    }
    
}
