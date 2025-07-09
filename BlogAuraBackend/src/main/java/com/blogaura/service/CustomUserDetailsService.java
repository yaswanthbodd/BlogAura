package com.blogaura.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.blogaura.CustomUserDetails;
import com.blogaura.entity.User;
import com.blogaura.repository.UserRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUserName(username);
		if(Objects.isNull(user)) {
			System.out.println("User Not Found");
			throw new UsernameNotFoundException("User Not Available");
		}
		return new CustomUserDetails(user);
	}
	
	
}
