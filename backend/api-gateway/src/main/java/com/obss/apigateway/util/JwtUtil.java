package com.obss.apigateway.util;

import com.obss.apigateway.exception.InvalidTokenException;
import com.obss.apigateway.filter.AuthenticationFilter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

@Service
public class JwtUtil {

    @Value("${jwt.security.secret-key}")
    private String SECRET_KEY;

    final Logger logger = LoggerFactory.getLogger(JwtUtil.class);


    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException exception) {
            throw new InvalidTokenException("Token Is Expired!");
        } catch (SignatureException exception) {
            throw new InvalidTokenException("Invalid Token!");
        }

    }

    public boolean isTokenValid(String token) {
        return !extractExpiration(token).before(new Date());
    }

    public Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String parseJWT(ServerHttpRequest request) {
        List<String> authHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION);
        if (authHeader != null && !authHeader.isEmpty()){
            String[] bearer_token = authHeader.get(0).split(" ");
            if (bearer_token.length == 2){
                return bearer_token[1];
            }
        }
        return null;
    }


    public String extractRole(String token) {
        try{
            Claims claims = extractAllClaims(token);
            return (String) claims.get("role");
        } catch (Exception ex){
            logger.error("Role Not found");
            return null;
        }
    }
}
