package com.obss.apigateway.filter;

import com.obss.apigateway.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    final Logger logger = LoggerFactory.getLogger(AuthenticationFilter.class);

    private final JwtUtil jwtUtil;

    @Autowired
    public AuthenticationFilter(JwtUtil jwtUtil) {
        super(Config.class);
        this.jwtUtil = jwtUtil;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String token = jwtUtil.parseJWT(request);
            if (token != null && jwtUtil.isTokenValid(token)){
                return chain.filter(exchange);
            }
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        };
    }

    public static class Config{
        private String baseMessage;
        private boolean preLogger;
        private boolean pastLogger;
    }
}
