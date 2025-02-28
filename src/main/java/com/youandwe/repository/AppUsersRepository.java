package com.youandwe.repository;


import org.springframework.data.repository.CrudRepository;


import com.youandwe.entity.AppUsers;



public interface AppUsersRepository extends CrudRepository<AppUsers, Integer> {
   
	public AppUsers findByEmail(String email);
	AppUsers findByUsername(String username);  
}
