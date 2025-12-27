package com.financetrack.backend.controller;

import com.financetrack.backend.model.Transaction;
import com.financetrack.backend.model.User;
import com.financetrack.backend.repository.TransactionRepository;
import com.financetrack.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public List<Transaction> getAll(@PathVariable Long userId) {
        return transactionRepository.findByUserId(userId);
    }

    @PostMapping
    public Transaction add(@RequestBody Transaction transaction) {
        User user = userRepository.findById(transaction.getUser().getId()).orElseThrow();
        transaction.setUser(user);

        if ("income".equals(transaction.getType())) {
            user.setBalance(user.getBalance() + transaction.getAmount());
        } else {
            user.setBalance(user.getBalance() - transaction.getAmount());
        }
        userRepository.save(user);

        return transactionRepository.save(transaction);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Transaction t = transactionRepository.findById(id).orElseThrow();
        User user = t.getUser();

        if ("income".equals(t.getType())) {
            user.setBalance(user.getBalance() - t.getAmount());
        } else {
            user.setBalance(user.getBalance() + t.getAmount());
        }
        userRepository.save(user);

        transactionRepository.deleteById(id);
    }
}