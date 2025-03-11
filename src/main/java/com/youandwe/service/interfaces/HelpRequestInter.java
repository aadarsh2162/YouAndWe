package com.youandwe.service.interfaces;

import com.youandwe.entity.HelpRequest;

public interface HelpRequestInter {
	public HelpRequest saveRequest(HelpRequest request);
	public Iterable<HelpRequest> getAllRequest();
	public String deleteById(Integer id) ;
	public HelpRequest updateHelpRequest(HelpRequest helpRequestDto, Long helpRequestId);
}
