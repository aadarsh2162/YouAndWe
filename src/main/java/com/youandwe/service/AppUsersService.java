package com.youandwe.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.youandwe.daos.AppUsersDAO;
import com.youandwe.entity.AppUsers;
import com.youandwe.repository.AppUsersRepository;

@Service
public class AppUsersService {

    @Autowired
    private AppUsersRepository appUsersRepository;

    // Find user by ID
    public AppUsersDAO findById(Integer userId) {
    	AppUsers user = appUsersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        return new AppUsersDAO(user.getUserId(), user.getName(), user.getEmail(), user.getUsername());
    }

    // Save a new user
    public AppUsersDAO saveNewUser(AppUsers user) {
        AppUsers savedUser = appUsersRepository.save(user);
        return new AppUsersDAO(savedUser.getUserId(), savedUser.getName(), savedUser.getEmail(), savedUser.getUsername());
    }
    
    

    // for login purpose
    public Boolean login(String usernameOrEmail, String password) {
        AppUsers loginData = appUsersRepository.findByEmail(usernameOrEmail);

        if (loginData == null) {
            loginData = appUsersRepository.findByUsername(usernameOrEmail);
        }

        if (loginData == null || !loginData.getPassword().equals(password)) {
            return false;
        }

        return true;
    }
    

    // Delete user by ID
    public String delete(Integer id) {
        if (!appUsersRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        appUsersRepository.deleteById(id);
        return "User deleted successfully with ID: " + id;
    }
}
