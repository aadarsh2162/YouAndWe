package com.youandwe.repository;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.youandwe.entity.LoginAndLogutDetails;

public interface LoAndOutDetailRepository extends CrudRepository<LoginAndLogutDetails, Integer> {
	
	
//	 @Query("SELECT u FROM LoginAndLogutDetails u WHERE u.usernameOrEmail = :usernameOrEmail")
//	    Optional<LoginAndLogutDetails> findByUsernameOrEmail(@Param("usernameOrEmail") String usernameOrEmail);
	
	public Optional<LoginAndLogutDetails> findByEmail(String eamil);
	Optional<LoginAndLogutDetails> findByUsername(String username); 

}
