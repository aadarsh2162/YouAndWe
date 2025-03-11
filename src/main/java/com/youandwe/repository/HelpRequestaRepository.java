package com.youandwe.repository;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.youandwe.entity.HelpRequest;

public interface HelpRequestaRepository  extends CrudRepository<HelpRequest, Integer>{
  Optional<HelpRequest>  findById(Long id);

}
