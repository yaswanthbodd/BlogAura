package com.blogaura.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogaura.entity.Posts;
import com.blogaura.entity.User;

public interface PostRepository extends JpaRepository<Posts, Long> {

    // Find all posts made by a specific user
    List<Posts> findByUser(User user);

    // Optional: Find all posts made by a specific user, ordered by time (latest first)
    List<Posts> findByUserOrderByPostTimeDesc(User user);

    // Optional: Find all posts ordered by time (latest first)
    List<Posts> findAllByOrderByPostTimeDesc();
    
    
}
