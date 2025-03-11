package com.youandwe.repository;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.youandwe.entity.AppUsers;



public interface AppUsersRepository extends CrudRepository<AppUsers, Integer> {

	
	 Optional<AppUsers> findByUsername(String username);
	    
	    Optional<AppUsers> findByUsernameOrEmail(String username, String email);
	    Boolean existsByEmail(String email);
	    Boolean existsByUsername(String username);
	    

}
