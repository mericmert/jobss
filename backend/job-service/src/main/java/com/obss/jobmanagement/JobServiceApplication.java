package com.obss.jobmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableDiscoveryClient
@EnableScheduling
public class JobServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobServiceApplication.class, args);
    }

}
