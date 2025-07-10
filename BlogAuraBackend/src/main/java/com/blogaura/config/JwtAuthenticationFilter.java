package com.blogaura.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.blogaura.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String jwt = null;
		
		// Read the JWT from cookies
		if(request.getCookies() != null) {
			for(Cookie cookie: request.getCookies()) {
				if("jwt".equals(cookie.getName())) {
					jwt = cookie.getValue();
					System.out.println("JWT found in cookie: " + jwt);
					break;
				}
			}
		}
		
		if(jwt == null) {
			System.out.println("No JWT cookie found");
			filterChain.doFilter(request, response);
			return;
		}
		
		try {
			String userName = jwtService.extractUserName(jwt);
			
			// Check if user is already authenticated
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			
			if(userName != null && authentication == null) {
				
				// Load user details and validate token
				UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
				
				if(jwtService.isTokenValid(jwt, userDetails)) {
					System.out.println("JWT is valid for user: " + userName);
					
					UsernamePasswordAuthenticationToken authenticationToken = 
							new UsernamePasswordAuthenticationToken(
								userDetails, 
								null, 
								userDetails.getAuthorities()
							);
					
					// Set authentication details
					authenticationToken.setDetails(
						new WebAuthenticationDetailsSource().buildDetails(request)
					);
					
					SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				} else {
					System.out.println("JWT is invalid for user: " + userName);
					// Clear invalid JWT cookie
					clearJwtCookie(response);
				}
			}
		} catch (Exception e) {
			System.out.println("JWT validation failed: " + e.getMessage());
			// Clear invalid JWT cookie
			clearJwtCookie(response);
		}
		
		filterChain.doFilter(request, response);
	}
	
	// Helper method to clear JWT cookie
	private void clearJwtCookie(HttpServletResponse response) {
		Cookie cookie = new Cookie("jwt", null);
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}

}