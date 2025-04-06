package com.cakecrafters.backend.controller;

import com.cakecrafters.backend.entity.PostLike;  // Updated to PostLike
import com.cakecrafters.backend.service.PostLikeService;  // Updated to PostLikeService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class PostLikeController {
    @Autowired
    private PostLikeService postLikeService;

    @PostMapping
    public PostLike createLike(@RequestBody PostLike postLike) {
        return postLikeService.createLike(postLike);
    }

    @DeleteMapping("/{id}")
    public void deleteLike(@PathVariable Long id) {
        postLikeService.deleteLike(id);
    }
}