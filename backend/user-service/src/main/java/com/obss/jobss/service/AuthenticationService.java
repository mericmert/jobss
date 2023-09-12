package com.obss.jobss.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.obss.jobss.exception.InvalidAuthenticationException;
import com.obss.jobss.model.Account;
import com.obss.jobss.model.Role;
import com.obss.jobss.model.User;
import com.obss.jobss.model.auth.AuthResponse;
import com.obss.jobss.model.auth.OAuth2Response;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.filter.AndFilter;
import org.springframework.ldap.filter.EqualsFilter;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final LdapTemplate ldapTemplate;
    private final RestTemplate restTemplate;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @Value("${spring.security.oauth2.client.provider.linkedin.token-uri}")
    private String LINKEDIN_OAUTH_TOKEN_URI;
    @Value("${spring.security.oauth2.client.registration.linkedin.authorization-grant-type}")
    private String GRANT_TYPE;
    @Value("${spring.security.oauth2.client.registration.linkedin.client-id}")
    private String CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.linkedin.client-secret}")
    private String CLIENT_SECRET;
    @Value("${app.linkedin.redirect-uri}")
    private String REDIRECT_URI;

    public AuthResponse authenticateWithLDAP(String uid, String password) throws InvalidAuthenticationException {

        AndFilter filter = new AndFilter();
        filter.and(new EqualsFilter("objectclass", "person"))
                .and(new EqualsFilter("uid", uid))
                .and(new EqualsFilter("userPassword", password));

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", Role.HR.name());
        if (ldapTemplate.authenticate("", filter.encode(), password)) {
            return AuthResponse.builder()
                    .accessToken(jwtUtil.generateToken(uid, extraClaims))
                    .refreshToken(jwtUtil.generateRefreshToken(uid))
                    .build();

        } else {
            throw new InvalidAuthenticationException("Bad credentials!");
        }
    }


    public AuthResponse authenticateWithLinkedin(String code) {
        OAuth2Response resBody = exchangeCode(code);
        if (resBody != null) {
            Map<String, Object> userDetails;
            try {
                userDetails = jwtUtil.decodeJWT(resBody.getId_token());
                userDetails.put("role", Role.USER.name());
            } catch (JsonProcessingException e) {
                throw new InvalidAuthenticationException("Invalid JSON Format!");
            }
            String subject = (String) userDetails.get("subject");
            User user = createAccountIfNotExist(userDetails);
            userDetails.put("id", user.getId());
            return AuthResponse.builder()
                    .accessToken(jwtUtil.generateToken(subject, userDetails))
                    .refreshToken(jwtUtil.generateRefreshToken(subject))
                    .build();
        }
        throw new InvalidAuthenticationException("Something went wrong!");
    }

    public User createAccountIfNotExist(Map<String, Object> userDetails) {
        if (Objects.nonNull(userDetails)) {
            String email = (String) userDetails.get("email");
            if (!userService.isExistByEmail(email)) {
                return userService.createAccount(Account.fromMap(userDetails));
            }
            return userService.findByEmail(email);
        }
        return null;
    }


    public OAuth2Response exchangeCode(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", GRANT_TYPE);
        requestBody.add("client_id", CLIENT_ID);
        requestBody.add("client_secret", CLIENT_SECRET);
        requestBody.add("redirect_uri", REDIRECT_URI);
        requestBody.add("code", code);
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<OAuth2Response> response = restTemplate.exchange(LINKEDIN_OAUTH_TOKEN_URI, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<OAuth2Response>() {
        });

        return response.getBody();
    }

}
