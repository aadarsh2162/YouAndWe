package com.youandwe.service.interfaces;

import com.youandwe.daos.JwtAuthResponse;
import com.youandwe.daos.LoginRequestDAO;
import com.youandwe.entity.AppUsers;

public interface UserAuth {
	public AppUsers register(AppUsers user);
	public JwtAuthResponse verify(LoginRequestDAO loginRequestDAO);
	
	public Long countUser();
}
