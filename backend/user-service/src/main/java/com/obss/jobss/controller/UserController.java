package com.obss.jobss.controller;

import com.obss.jobss.model.User;
import com.obss.jobss.model.UserDTO;
import com.obss.jobss.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public ResponseEntity<List<UserDTO>> getUsers() {;
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping("/blacklist")
    public ResponseEntity<UserDTO> blacklist(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.blacklist(userDTO));
    }
}
