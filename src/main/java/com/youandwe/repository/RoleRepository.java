package com.youandwe.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.youandwe.entity.Role;

public interface RoleRepository extends CrudRepository<Role, Integer>{
	  Role findByName(String name);
}
