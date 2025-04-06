package com.cakecrafters.backend.repository;

import com.cakecrafters.backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}