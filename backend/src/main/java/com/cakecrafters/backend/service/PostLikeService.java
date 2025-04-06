package com.cakecrafters.backend.service;

import com.cakecrafters.backend.entity.PostLike;  // Updated to PostLike
import com.cakecrafters.backend.repository.PostLikeRepository;  // Updated to PostLikeRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostLikeService {
    @Autowired
    private PostLikeRepository postLikeRepository;

    public PostLike createLike(PostLike postLike) {
        return postLikeRepository.save(postLike);
    }

    public void deleteLike(Long id) {
        postLikeRepository.deleteById(id);
    }
}