package com.youandwe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class YouAndWeApplication {

	public static void main(String[] args) {
		SpringApplication.run(YouAndWeApplication.class, args);
	}

}
