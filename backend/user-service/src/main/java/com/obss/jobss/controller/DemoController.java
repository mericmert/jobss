package com.obss.jobss.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/")
    public ResponseEntity<?> deneme(@AuthenticationPrincipal OAuth2User user){
        return ResponseEntity.ok(user.getAttributes().toString());
    }

    @GetMapping("/login")
    public void login(HttpServletResponse response){

    }
}
