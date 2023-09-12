package com.obss.jobss.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtUtil {

    @Value("${jwt.security.secret-key}")
    private String SECRET_KEY;
    @Value("${jwt.security.expiration}")
    private Long EXPIRATION;
    @Value("${jwt.security.refresh-expiration}")
    private Long REFRESH_EXPIRATION;

    public String buildToken(String subject, Long expiration, Map<String, Object> extraClaims){
        return Jwts.builder()
                .setClaims(extraClaims)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .compact();
    }

    public  String generateToken(String subject) {
        return buildToken(subject, EXPIRATION, new HashMap<>());
    }


    public  String generateRefreshToken(String subject) {
        return buildToken(subject, REFRESH_EXPIRATION, new HashMap<>());
    }

    public String generateToken(String subject, Map<String, Object> extraClaims){
        return buildToken(subject, EXPIRATION, extraClaims);
    }

    public Key getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Map<String, Object> decodeJWT(String token) throws JsonProcessingException {
        String payload = token.split("\\.")[1];
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String decodedPayload = new String(decoder.decode(payload));
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> claims = objectMapper.readValue(decodedPayload, Map.class);
        return claims;
    }
}
