package com.cakecrafters.backend.controller;

import com.cakecrafters.backend.entity.DecorationTip;
import com.cakecrafters.backend.service.DecorationTipsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/decoration-tips")
public class DecorationTipsController {

    @Autowired
    private DecorationTipsService decorationTipsService;

    // Create a new decorating tip
    @PostMapping
    public ResponseEntity<DecorationTip> createDecorationTip(@RequestBody DecorationTip decorationTip) {
        DecorationTip savedTip = decorationTipsService.createDecorationTip(decorationTip);
        return new ResponseEntity<>(savedTip, HttpStatus.CREATED);
    }

    // Get all decorating tips
    @GetMapping
    public ResponseEntity<List<DecorationTip>> getAllDecorationTips() {
        List<DecorationTip> tips = decorationTipsService.getAllDecorationTips();
        return new ResponseEntity<>(tips, HttpStatus.OK);
    }

    // Get a decorating tip by ID
    @GetMapping("/{id}")
    public ResponseEntity<DecorationTip> getDecorationTipById(@PathVariable Long id) {
        DecorationTip tip = decorationTipsService.getDecorationTipById(id);
        return new ResponseEntity<>(tip, HttpStatus.OK);
    }

    // Update a decorating tip
    @PutMapping("/{id}")
    public ResponseEntity<DecorationTip> updateDecorationTip(@PathVariable Long id, @RequestBody DecorationTip decorationTip) {
        DecorationTip updatedTip = decorationTipsService.updateDecorationTip(id, decorationTip);
        return new ResponseEntity<>(updatedTip, HttpStatus.OK);
    }

    // Delete a decorating tip
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDecorationTip(@PathVariable Long id) {
        decorationTipsService.deleteDecorationTip(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Fixed typo here
    }
}