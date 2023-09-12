package com.obss.jobss;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.kafka.core.KafkaTemplate;

@SpringBootApplication
@EnableDiscoveryClient
public class UserServiceApplication{


    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
