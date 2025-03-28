package com.youandwe.entity;

import java.time.LocalDateTime;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class HelpRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
//	
//	 @Column(nullable = true)
//	private String email;

    @Column(nullable = false)
    private String username;

	@Column(nullable = false) 
	private String help;
	
	private String details ;
	
	private LocalDateTime requestPostedOn;
	
	
	
	@ManyToOne
	@JoinColumn(name = "appUsers_id")
	@JsonIgnore
	private AppUsers appUsers;
	
	
	
}
