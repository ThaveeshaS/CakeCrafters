package com.cakecrafters.backend.repository;

import com.cakecrafters.backend.entity.PostLike;  // Updated to PostLike
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
}