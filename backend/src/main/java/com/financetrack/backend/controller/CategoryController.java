package com.financetrack.backend.controller;

import com.financetrack.backend.model.Category;
import com.financetrack.backend.model.User;
import com.financetrack.backend.repository.CategoryRepository;
import com.financetrack.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public List<Category> getAll(@PathVariable Long userId) {
        return categoryRepository.findByUserId(userId);
    }

    @PostMapping
    public Category add(@RequestBody Category category) {
        User user = userRepository.findById(category.getUser().getId()).orElseThrow();
        category.setUser(user);
        return categoryRepository.save(category);
    }
}