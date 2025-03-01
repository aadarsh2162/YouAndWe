package com.youandwe.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

@Table(uniqueConstraints = @UniqueConstraint (columnNames = {"username","email" }))
public class LoginAndLogutDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer user_id;
	
//	@Column(nullable = false, unique = true)
//	private String usernameOrEmail;
	
	
	private String username;
	
	
	private String email;
	
	
	private String password;
	

	@Column(nullable = false)
	private LocalDateTime loginTime;
	

	
   
}
