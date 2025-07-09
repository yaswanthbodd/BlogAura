package com.blogaura.controller;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class WelcomeController {
	
	@GetMapping("/")
	public String home() {
		return "Hello This is yaswanth";
	}
	
	// Get the CSRF TOKEN
		@GetMapping("/csrf")
		public CsrfToken getTokent(HttpServletRequest request) {
			return (CsrfToken) request.getAttribute("_csrf");
		}
}
