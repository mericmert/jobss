package com.obss.jobss.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Collections;

@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final PasswordEncoder passwordEncoder;
    private final LdapAuthoritiesPopulator ldapAuthoritiesPopulator;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(customizer -> customizer
                        .requestMatchers("/api/v1/users/").permitAll()
                        .requestMatchers("/api/v1/users/**").permitAll()
                        .requestMatchers( "/oauth2/**").permitAll()
                        .anyRequest().permitAll()
        )
        //.oauth2Login(Customizer.withDefaults())
        .formLogin(AbstractHttpConfigurer::disable)
        .httpBasic(AbstractHttpConfigurer::disable)
        .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    @Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .ldapAuthentication()
                .userDnPatterns("uid={0},ou=people")
                .userSearchFilter("uid={0}")
                .groupSearchSubtree(true)
                .contextSource()
                .url("ldap://localhost:8389/dc=springframework,dc=org")
                .and()
                .passwordCompare()
                .passwordEncoder(passwordEncoder)
                .passwordAttribute("userPassword")
                .and()
                .ldapAuthoritiesPopulator(ldapAuthoritiesPopulator);
    }
}
