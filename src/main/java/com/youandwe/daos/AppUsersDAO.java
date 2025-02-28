package com.youandwe.daos;

public class AppUsersDAO {

    private Integer userId;
    private String name;
    private String email;
    private String username;

    public AppUsersDAO() {
        super();
    }

    public AppUsersDAO(Integer userId, String name, String email, String username) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.username = username;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
