package com.blogaura.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {
	private Long postId;
	private String title;
	private String description;
	private LocalDateTime postTime;
	
	private int likeCount;
	private int dislikeCount;
	
	private String postImageType;
	private String postImageBase64;
	
	//User info
	private String userName;
	private String userImageType;
	private String userImageBase64;
}
