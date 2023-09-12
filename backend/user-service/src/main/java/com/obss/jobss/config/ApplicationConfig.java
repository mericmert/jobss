package com.obss.jobss.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.support.BaseLdapPathContextSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.ldap.userdetails.DefaultLdapAuthoritiesPopulator;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ApplicationConfig {

    @Bean
    LdapAuthoritiesPopulator authorities(BaseLdapPathContextSource contextSource) {
        String groupSearchBase = "";
        DefaultLdapAuthoritiesPopulator authorities = new DefaultLdapAuthoritiesPopulator(contextSource, groupSearchBase);
        authorities.setSearchSubtree(true);
        authorities.setRolePrefix("ROLE_");
        authorities.setGroupSearchFilter("member={0}");
        return authorities;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
