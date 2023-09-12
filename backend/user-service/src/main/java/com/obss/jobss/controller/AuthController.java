package com.obss.jobss.controller;

import com.obss.jobss.model.auth.AuthResponse;
import com.obss.jobss.model.auth.LoginRequest;
import com.obss.jobss.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/users/auth/")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;
    @Value("${spring.security.oauth2.client.registration.linkedin.client-id}")
    private String clientId;
    @Value("${spring.security.oauth2.client.registration.linkedin.scope}")
    private String scope;
    @Value("${spring.security.oauth2.client.env.state}")
    private String state;
    @Value("${spring.security.oauth2.client.registration.linkedin.redirect-uri}")
    private String redirectUri;
    @Value("${spring.security.oauth2.client.env.nonce}")
    private String nonce;
    @Value("${spring.security.oauth2.client.provider.linkedin.authorization-uri}")
    private String authorizationServer;

    @GetMapping("/oauth-code")
    public RedirectView getAuthorizationCode(HttpServletResponse response) throws IOException {
        String authorizationUrl = getAuthorizationCodeUrl();
        return new RedirectView(authorizationUrl);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginLDAP(@RequestBody LoginRequest request){
        String uid = request.getUsername();
        String password = request.getPassword();
        return ResponseEntity.ok(authenticationService.authenticateWithLDAP(uid, password));
    }

    @GetMapping("/exchange-token")
    public ResponseEntity<AuthResponse> exchangeToken(@RequestParam String code){
        return ResponseEntity.ok(authenticationService.authenticateWithLinkedin(code));
    }

    private String getAuthorizationCodeUrl() {
        return UriComponentsBuilder.fromHttpUrl(authorizationServer)
                .queryParam("response_type", "code")
                .queryParam("client_id", clientId)
                .queryParam("scope", scope)
                .queryParam("state", state)
                .queryParam("redirect_uri", redirectUri)
                .queryParam("nonce", nonce)
                .toUriString();
    }


}
