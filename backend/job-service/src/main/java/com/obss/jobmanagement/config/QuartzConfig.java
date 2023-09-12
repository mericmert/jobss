package com.obss.jobmanagement.config;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.scheduling.quartz.SpringBeanJobFactory;

@Configuration
public class QuartzConfig {

    private final AutoWiringSpringBeanJobFactory autoWiringSpringBeanJobFactory;

    @Autowired
    public QuartzConfig(AutoWiringSpringBeanJobFactory autoWiringSpringBeanJobFactory) {
        this.autoWiringSpringBeanJobFactory = autoWiringSpringBeanJobFactory;
    }


    @Bean
    public Scheduler scheduler() throws Exception {
        SchedulerFactoryBean schedulerFactoryBean = new SchedulerFactoryBean();
        schedulerFactoryBean.setJobFactory(autoWiringSpringBeanJobFactory);
        schedulerFactoryBean.afterPropertiesSet();
        Scheduler scheduler = schedulerFactoryBean.getScheduler();
        scheduler.start();
        return scheduler;
    }
}
