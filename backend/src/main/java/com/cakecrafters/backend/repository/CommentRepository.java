package com.cakecrafters.backend.repository;

import com.cakecrafters.backend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}