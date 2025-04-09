package com.cakecrafters.backend.controller;

import com.cakecrafters.backend.entity.Recipe;
import com.cakecrafters.backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @PostMapping("/create")
    public ResponseEntity<?> createRecipe(
            @RequestPart("recipe") String recipeJson,
            @RequestPart(value = "images", required = false) MultipartFile[] images) {
        
        try {
            // Add validation for empty JSON
            if (recipeJson == null || recipeJson.isEmpty()) {
                return ResponseEntity.badRequest().body("Recipe data cannot be empty");
            }
            
            Recipe savedRecipe = recipeService.saveRecipe(recipeJson, images);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRecipe);
            
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File processing error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        }
    }

    // Other endpoints remain the same
}